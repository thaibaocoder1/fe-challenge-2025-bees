import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='container mx-auto'>
      <div className='flex flex-wrap justify-between items-center'>
        <Link to='/' className='flex items-center'>
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            BAODEV
          </span>
        </Link>

        <button
          onClick={toggleMobileMenu}
          className='lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </button>

        <div
          className={`lg:flex lg:w-auto lg:order-1 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:block`}
          id='mobile-menu-2'
        >
          <ul className='flex flex-col items-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
            {[
              { path: '/', label: 'Home' },
              { path: '/logic-test', label: 'Logic Test' },
              { path: '/app-development-test', label: 'App Development Test' },
            ].map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 
                      transition duration-300 ease-in-out 
                      ${
                        isActive
                          ? 'text-primary-700 dark:text-white'
                          : 'text-gray-700 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white'
                      }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
