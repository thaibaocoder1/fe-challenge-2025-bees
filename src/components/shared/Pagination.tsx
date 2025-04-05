import { TPaginationResponse } from '@/types/api-response.type';
import { useSearchParams } from 'react-router';
import DropdownLimitPagination from './DropdownLimitPagination';

const Pagination = ({
  pagination,
  urlParamName,
}: {
  pagination: TPaginationResponse;
  urlParamName: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query');

  const handleClick = (btnType: string) => {
    const pageValue =
      btnType === 'next' ? Number(pagination.currentPage) + 1 : Number(pagination.currentPage) - 1;
    setSearchParams(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(urlParamName || 'page', pageValue.toString());
      return newParams;
    });
  };

  const handlePageChange = (number: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchParams(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(urlParamName || 'page', number.toString());
      return newParams;
    });
  };

  const handleLimitChange = (limit: number) => {
    setSearchParams(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('limit', limit.toString());
      return newParams;
    });
  };

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) return [1];

    const delta = 2;
    const range = [];
    const alwaysShowSecondLast = true;

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 1) {
      range.unshift('...');
    }
    if (currentPage - delta > 2) {
      range.unshift(1);
    }

    if (alwaysShowSecondLast && totalPages > 1) {
      const secondLastPage = totalPages - 1;
      if (!range.includes(secondLastPage) && secondLastPage !== 1) {
        range.push('...', secondLastPage);
      }
    }

    if (!range.includes(totalPages)) {
      range.push(totalPages);
    }

    const result = [1, ...range, totalPages].filter(
      (x, i, arr) => x !== arr[i + 1] && x !== undefined
    );

    return result;
  };

  const paginatedData = getPaginationRange(pagination.currentPage, pagination.totalPages);

  return (
    <div className='flex items-center justify-between bg-white dark:bg-gray-900'>
      <div className='flex flex-1 justify-start sm:hidden'>
        <button
          type='button'
          disabled={pagination.currentPage < 2}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:disabled:cursor-not-allowed cursor-pointer'
          onClick={() => handleClick('prev')}
        >
          Previous
        </button>
        <button
          type='button'
          disabled={pagination.currentPage >= pagination.totalPages}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:disabled:cursor-not-allowed cursor-pointer'
          onClick={() => handleClick('next')}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>
              {queryFromUrl && pagination.countRecords === 0
                ? 0
                : Math.min(
                    (pagination.currentPage - 1) * pagination.limit + 1,
                    pagination.totalRecords
                  )}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {queryFromUrl
                ? pagination.countRecords
                : Math.min(pagination.currentPage * pagination.limit, pagination.totalRecords)}
            </span>{' '}
            of <span className='font-medium'>{pagination.totalRecords}</span> results
          </p>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <DropdownLimitPagination onLimitChange={handleLimitChange} />
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-xs'
            aria-label='Pagination'
          >
            <button
              type='button'
              disabled={pagination.currentPage < 2}
              onClick={() => handleClick('prev')}
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:disabled:cursor-not-allowed cursor-pointer'
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='size-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
                data-slot='icon'
              >
                <path
                  fillRule='evenodd'
                  d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {paginatedData
              ? paginatedData.map((number, index) =>
                  number === '...' ? (
                    <span key={`ellipsis-${index}`} className='px-4 py-2 dark:text-gray-900'>
                      ...
                    </span>
                  ) : (
                    <a
                      key={number}
                      href='#!'
                      onClick={(e) => handlePageChange(number as number, e)}
                      className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium rounded-xs transition-all duration-200 ${
                        pagination.currentPage === number
                          ? 'bg-indigo-600 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {number}
                    </a>
                  )
                )
              : null}
            <button
              type='button'
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => handleClick('next')}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:disabled:cursor-not-allowed cursor-pointer'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='size-5'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
                data-slot='icon'
              >
                <path
                  fillRule='evenodd'
                  d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
