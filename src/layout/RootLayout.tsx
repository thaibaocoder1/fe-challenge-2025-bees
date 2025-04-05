import Footer from '@/components/Footer';
import Header from '@/components/shared/Header';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow container mx-auto p-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
