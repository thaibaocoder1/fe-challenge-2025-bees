import { formatCurrency } from '@/lib/format-balance';
import { formatDateTime } from '@/lib/format-date-time';
import { TUser } from '@/types/user.type';
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { TableColumn } from './TableColumn';

type Props = {
  data: TUser[];
};

const TableData: React.FC<Props> = ({ data }) => {
  const [selectedIdCheckbox, setSelectedIdCheckbox] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (id: string) => {
    setSelectedIdCheckbox((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((_id) => _id !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const handleChecboxAllChange = () => {
    if (selectedIdCheckbox.length === data.length) {
      setSelectedIdCheckbox([]);
    } else {
      setSelectedIdCheckbox(data.map((item) => item.id));
    }
  };

  const isCheckedAll = selectedIdCheckbox.length === data.length;

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    setSearchParams(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('field', accessor);
      newParams.set('sort', sortOrder);
      return newParams;
    });
  };

  return (
    <div className='p-3 overflow-x-auto'>
      <table className='table-auto w-full'>
        <thead className='text-xs font-semibold uppercase text-slate-900'>
          <tr>
            {TableColumn.map((col) => {
              const sortIcon =
                sortField === col.key && order === 'asc' ? (
                  <ArrowUpNarrowWide size={16} />
                ) : sortField === col.key && order === 'desc' ? (
                  <ArrowDownWideNarrow size={16} />
                ) : (
                  <ArrowDownUp size={16} />
                );
              return (
                <th
                  key={col.key}
                  className={`p-2 text-left ${
                    col.key === 'name' && 'inline-flex gap-1 items-center'
                  }`}
                  onClick={col.sortable ? () => handleSortingChange(col.key) : undefined}
                >
                  {col.key === 'name' && (
                    <div className='inline-flex items-center'>
                      <label className='flex items-center cursor-pointer relative'>
                        <input
                          type='checkbox'
                          className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800'
                          checked={isCheckedAll}
                          onChange={handleChecboxAllChange}
                        />
                        <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-3.5 w-3.5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            stroke='currentColor'
                            strokeWidth='1'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                  )}
                  <span className='inline-flex items-center gap-1 dark:text-white whitespace-nowrap'>
                    {col.label}
                    {col.sortable && <span className='text-gray-500'>{sortIcon}</span>}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className='text-sm divide-y divide-gray-100 bg-slate-50 dark:text-white dark:bg-gray-900'>
          {data.map((customer) => (
            <tr key={customer.id}>
              <td className='p-2 whitespace-nowrap inline-flex gap-1 items-center'>
                <div className='inline-flex items-center'>
                  <label className='flex items-center cursor-pointer relative'>
                    <input
                      type='checkbox'
                      className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800'
                      checked={selectedIdCheckbox?.includes(customer.id)}
                      onChange={() => handleCheckboxChange(customer.id)}
                    />
                    <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3.5 w-3.5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        stroke='currentColor'
                        strokeWidth='1'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                {customer.name}
              </td>
              <td className='p-2 whitespace-nowrap font-medium'>
                {formatCurrency(customer.balance)}
              </td>
              <td className='p-2 whitespace-nowrap'>
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </td>
              <td className='p-2 whitespace-nowrap relative group'>
                <span className='text-gray-900'>
                  {formatDateTime(customer.registerAt).registrationDate}
                </span>
                <div className='absolute bottom-8/12 -left-1/2 transform translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-gray-600 text-white rounded p-2 shadow-lg'>
                  {formatDateTime(customer.registerAt).dateTime}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <span
                  className={`inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-medium ${
                    customer.active
                      ? 'bg-gray-100 text-gray-600 ring-gray-500/10'
                      : 'bg-red-100 text-red-600 ring-red-500/10'
                  }`}
                >
                  {customer.active ? 'Active' : 'Unactive'}
                </span>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <button type='button' className='cursor-pointer pr-1'>
                  <Pencil size={20} />
                </button>
                <button type='button' className='cursor-pointer'>
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
