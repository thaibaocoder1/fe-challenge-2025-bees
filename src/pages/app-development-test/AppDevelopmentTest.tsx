import AlertErrorMessage from '@/components/AlertMessage';
import SearchInput from '@/components/shared/Search';
import TableDataSkeleton from '@/pages/app-development-test/TableDataSkeleton';
import { getAllCustomers } from '@/services/customer.service';
import { TPaginationResponse } from '@/types/api-response.type';
import { TUser } from '@/types/user.type';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import TableData from './TableData';

const AppDevelopmentTestPage = () => {
  const [customerList, setCustomerList] = useState<TUser[] | undefined>(undefined);
  const [customerPagination, setCustomerPagination] = useState<TPaginationResponse | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const { page, limit, query, field, sort } = Object.fromEntries(searchParams);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const customers = await getAllCustomers<TUser>({
          params: {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            query: query ? query.trim() : undefined,
            field: field ? field : undefined,
            sort: sort ? sort : undefined,
          },
        });
        if (customers) {
          setErrorMessage(null);
          const { data, pagination } = customers;
          setCustomerList(data);
          setCustomerPagination(pagination);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.statusText || 'An error occurred while fetching customers.'
          );
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      }
    };
    getCustomers();
  }, [page, limit, query, sort, field]);

  if (errorMessage) return <AlertErrorMessage message={errorMessage} />;

  if (!customerList || !customerPagination) return <TableDataSkeleton amount={10} />;

  console.log({
    customerList,
    customerPagination,
  });

  return (
    <div className='w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200 flex-grow'>
      <header className='px-5 py-4 border-b border-gray-100 flex items-center justify-between'>
        <h2 className='font-semibold text-gray-800'>Customers</h2>
        <SearchInput />
      </header>
      <TableData data={customerList} pagination={customerPagination} />
    </div>
  );
};

export default AppDevelopmentTestPage;
