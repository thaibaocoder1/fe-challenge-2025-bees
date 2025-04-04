import { useCallback, useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const onWindowMatch = useCallback(() => {
    if (!('theme' in localStorage)) {
      if (darkQuery.matches) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  }, [darkQuery.matches, element.classList]);

  useEffect(() => {
    const changeHandler = (e: MediaQueryListEvent) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          element.classList.add('dark');
        } else {
          element.classList.remove('dark');
        }
      }
    };

    darkQuery.addEventListener('change', changeHandler);

    return () => {
      darkQuery.removeEventListener('change', changeHandler);
    };
  }, [darkQuery, element]);

  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        onWindowMatch();
        break;
    }
  }, [element.classList, onWindowMatch, theme]);

  return { theme, setTheme };
};

export default useTheme;
