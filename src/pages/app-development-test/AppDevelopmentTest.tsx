import AlertErrorMessage from '@/components/AlertMessage';
import Pagination from '@/components/shared/Pagination';
import SearchInput from '@/components/shared/Search';
import TableDataSkeleton from '@/pages/app-development-test/TableDataSkeleton';
import { getAllCustomers } from '@/services/customer.service';
import { TPaginationResponse } from '@/types/api-response.type';
import { TUser } from '@/types/user.type';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import InfiniteScrollTable from './InfiniteScrollTable';
import TableData from './TableData';

const AppDevelopmentTestPage = () => {
  const [customerList, setCustomerList] = useState<TUser[]>([]);
  const [pagination, setPagination] = useState<TPaginationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { page, limit, query, field, sort } = Object.fromEntries(searchParams);
  const [viewMode, setViewMode] = useState<'pagination' | 'infinite'>('pagination');

  const fetchCustomers = useCallback(
    async (pageNum: number, isInfiniteScroll = false) => {
      const controller = new AbortController();
      const signal = controller.signal;

      setIsLoading(true);

      try {
        const customers = await getAllCustomers<TUser>({
          params: {
            page: pageNum,
            limit: parseInt(limit) || 10,
            query: query ? query.trim() : undefined,
            field: field ? field : undefined,
            sort: sort ? sort : undefined,
          },
          signal,
        });

        if (customers) {
          setErrorMessage(null);
          const { data, pagination } = customers;

          if (isInfiniteScroll && pageNum > 1) {
            setCustomerList((prev) => [...prev, ...data]);
          } else {
            setCustomerList(data);
          }

          setPagination(pagination);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled');
        } else if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.statusText || 'An error occurred while fetching customers.'
          );
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort();
    },
    [limit, query, sort, field]
  );

  useEffect(() => {
    fetchCustomers(parseInt(page || '1'));
  }, [fetchCustomers, page, limit, query, sort, field]);

  const handleLoadMore = useCallback(() => {
    if (pagination && pagination.currentPage < pagination.totalPages) {
      fetchCustomers(pagination.currentPage + 1, true);
    }
  }, [pagination, fetchCustomers]);

  const toggleViewMode = () => {
    setViewMode((prev) => {
      if (prev === 'pagination') {
        return 'infinite';
      } else {
        fetchCustomers(1);
        return 'pagination';
      }
    });
  };

  if (errorMessage) return <AlertErrorMessage message={errorMessage} />;

  if (!pagination && isLoading) return <TableDataSkeleton amount={10} />;

  return (
    <section className='w-full max-w-full mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700 flex-grow overflow-hidden'>
      <div className='px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4'>
        <h2 className='font-semibold text-gray-800 dark:text-white text-lg'>Customers</h2>
        <div className='w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
          <SearchInput />
          <button
            onClick={toggleViewMode}
            className='text-sm text-blue-600 hover:underline dark:text-blue-400'
          >
            {viewMode === 'pagination' ? 'Switch to Infinite Scroll' : 'Switch to Pagination'}
          </button>
        </div>
      </div>

      <div>
        {viewMode === 'pagination' ? (
          <>
            <TableData data={customerList} />
            {pagination && (
              <div className='px-4 py-3 sm:px-5 sm:py-4 border-t border-gray-100 dark:border-gray-700'>
                <Pagination pagination={pagination} urlParamName='page' />
              </div>
            )}
          </>
        ) : (
          <InfiniteScrollTable
            data={customerList}
            isLoading={isLoading}
            hasMore={pagination ? pagination.currentPage < pagination.totalPages : false}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
    </section>
  );
};

export default AppDevelopmentTestPage;
