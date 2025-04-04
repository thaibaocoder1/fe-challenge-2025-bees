import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

const DropdownLimitPagination = ({ onLimitChange }: { onLimitChange: (limit: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const currentLimit = searchParams.get('limit') || 10;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLimitChange = (limit: number) => {
    if (onLimitChange) {
      onLimitChange(limit);
      setIsOpen(false);
    }
  };

  return (
    <div className='relative inline-block text-left ml-4' ref={menuRef}>
      <button
        type='button'
        className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semiboldtext-gray-700 dark:text-gray-400 hover:text-primary-700 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        Rows per page: {currentLimit}
        <svg
          className='-mr-1 size-5 text-gray-400 transition-transform duration-200'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
          data-slot='icon'
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            fillRule='evenodd'
            d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none transform transition-all duration-150 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className='py-1 flex flex-col'>
          {[10, 15, 20, 25].map((numberLimit, index) => (
            <span
              key={index}
              onClick={() => handleLimitChange(numberLimit)}
              className={`px-4 py-2 text-sm text-gray-700 inline-flex gap-2 items-center cursor-pointer ${
                Number(currentLimit) === numberLimit
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {numberLimit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownLimitPagination;
