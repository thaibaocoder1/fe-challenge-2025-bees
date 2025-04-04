import { AlertCircle } from 'lucide-react';

const AlertErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className='bg-red-100 text-red-700 p-4 rounded-md border border-red-300'>
      <div className='flex items-start gap-2'>
        <AlertCircle className='w-5 h-5 mt-0.5' />
        <div>
          <p className='font-semibold'>There was error with your API</p>
          <ul className='mt-1 list-disc list-inside'>
            <li>{message}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertErrorMessage;
