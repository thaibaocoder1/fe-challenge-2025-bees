import { TUser } from '@/types/user.type';
import { useEffect, useRef, useState } from 'react';
import TableData from './TableData';

interface InfiniteScrollTableProps {
  data: TUser[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const InfiniteScrollTable = ({
  data,
  isLoading,
  hasMore,
  onLoadMore,
}: InfiniteScrollTableProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      <TableData data={data} />
      {isLoading && (
        <div className='flex justify-center p-4'>
          <div
            className='animate-spin inline-block size-6 border-3 border-current border-t-transparent text-slate-600 rounded-full dark:text-slate-500'
            role='status'
            aria-label='loading'
          >
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
      <div ref={observerRef} className='h-1' />
      {!hasMore && data.length > 0 && (
        <div className='text-center p-2 text-gray-500'>No more customers to load</div>
      )}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className='fixed bottom-6 right-6 w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all cursor-pointer'
          aria-label='Scroll to top'
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default InfiniteScrollTable;
