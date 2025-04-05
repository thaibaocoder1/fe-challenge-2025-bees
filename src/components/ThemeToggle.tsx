import useTheme from '@/hooks/use-theme';
import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { setTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <div className='relative inline-block text-left' ref={menuRef}>
      <button
        type='button'
        className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semiboldtext-gray-700 dark:text-gray-400 hover:text-primary-700 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        Theme
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
          <span
            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 inline-flex gap-2 items-center'
            onClick={() => handleChangeTheme('light')}
          >
            Light
            <Sun size={20} />
          </span>
          <span
            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 inline-flex gap-2 items-center'
            onClick={() => handleChangeTheme('dark')}
          >
            Dark
            <Moon size={20} />
          </span>
          <span
            className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 inline-flex gap-2 items-center'
            onClick={() => handleChangeTheme('system')}
          >
            System
            <MonitorSmartphone size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
