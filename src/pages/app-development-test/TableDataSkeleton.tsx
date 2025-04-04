const TableDataSkeleton = ({ amount }: { amount: number }) => {
  return (
    <div className='p-3 overflow-x-auto'>
      <table className='table-auto w-full'>
        <thead className='text-xs font-semibold uppercase text-slate-900'>
          <tr className='dark:bg-white'>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
            <th className='p-2 text-left'>
              <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
            </th>
          </tr>
        </thead>
        <tbody className='text-sm divide-y divide-gray-100 bg-slate-50'>
          {Array(amount)
            .fill(null)
            .map((_, index) => (
              <tr key={index}>
                <td className='p-2 whitespace-nowrap font-medium'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap font-medium'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap relative group'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='w-24 h-4 bg-slate-200 animate-pulse rounded'></div>
                </td>
                <td className='p-2 whitespace-nowrap flex place-items-center gap-1'>
                  <div className='w-6 h-6 bg-slate-200 animate-pulse rounded-full'></div>
                  <div className='w-6 h-6 bg-slate-200 animate-pulse rounded-full'></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDataSkeleton;
