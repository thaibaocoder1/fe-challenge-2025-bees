import useDebounce from '@/hooks/use-debounce';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState<string>(searchParams.get('query') || '');

  const debouncedSearch = useDebounce(queryValue, 500);

  useEffect(() => {
    if (debouncedSearch !== searchParams.get('query')) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams.toString());
        if (debouncedSearch) {
          newParams.set('query', debouncedSearch);
          newParams.set('page', '1');
        } else {
          newParams.delete('query');
        }
        return newParams;
      });
    }
  }, [debouncedSearch, setSearchParams, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
  };

  return (
    <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600'>
      <div className='shrink-0 text-base text-gray-500 select-none sm:text-sm/6'>
        <Search />
      </div>
      <input
        type='search'
        name='query'
        id='search'
        className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
        placeholder='Search here...'
        value={queryValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
