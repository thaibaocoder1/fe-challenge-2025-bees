import ThemeToggle from '@/components/ThemeToggle';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/logic-test', label: 'Logic Test' },
  { path: '/app-development-test', label: 'App Development Test' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className='flex items-center justify-between container mx-auto'>
      <div className='text-xl font-bold dark:text-white'>BAODEV</div>
      <ul className='hidden lg:flex items-center space-x-6'>
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `text-base transition ${
                  isActive
                    ? 'text-blue-600 dark:text-white font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className='cursor-pointer'>
          <ThemeToggle />
        </li>
      </ul>

      <button onClick={toggleSidebar} className='lg:hidden p-2 text-gray-700 dark:text-white'>
        <Menu size={20} />
      </button>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-40 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b dark:border-gray-700'>
          <span className='text-xl font-bold dark:text-white'>BAODEV</span>
          <button onClick={closeSidebar} className='text-gray-500 dark:text-gray-400 text-2xl'>
            &times;
          </button>
        </div>

        <ul className='flex flex-col p-4 space-y-4'>
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-2 py-2 rounded transition ${
                    isActive
                      ? 'text-blue-600 dark:text-white font-semibold'
                      : 'text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className='cursor-pointer'>
            <ThemeToggle />
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden'
          onClick={closeSidebar}
        />
      )}
    </nav>
  );
};

export default Navbar;
