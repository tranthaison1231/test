import { ReactNode, useState } from "react";
import { Control } from "../Control";
import clsx from 'clsx';
import { Sort } from '../Icon'
import { Checkbox } from "../Checkbox/Checkbox";

export interface Column<DataType> {
  id: string;
  title: string;
  render?: (column: DataType) => React.ReactNode;
  sortable?: boolean;
}

interface Props<DataType> {
  columns: Column<DataType>[];
  items: DataType[];
  selectedIds: string[];
  onSelect?: (ids: string[]) => void;
  onArchive?: () => void;
}

function Table<DataType extends { id: string } & Record<string, string | number | ReactNode>>({
  columns,
  items,
  selectedIds,
  onSelect,
  onArchive,
}: Props<DataType>) {
  const [sort, setSort] = useState<{ column: keyof DataType; direction: 'asc' | 'desc' }>({
    column: '',
    direction: 'asc',
  })

  const isSelectedAll = selectedIds.length ? selectedIds.length === items.length : false;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      onSelect?.([...selectedIds, id]);
    } else {
      onSelect?.(selectedIds.filter((item) => item !== id));
    }
  };

  const handelSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelect?.(items.map((item) => item.id));
    } else {
      onSelect?.([]);
    }
  };

  const onSort = (column: string) => {
    if (sort.column === column) {
      setSort({
        column,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSort({
        column,
        direction: 'asc',
      });
    }
  }

  const sortedItems = items.sort((a, b) => {
    if (a[sort.column]! < b[sort.column]!) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    if (a[sort.column]! > b[sort.column]!) {
      return sort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  })

  return (
    <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs">
        <tr>
          <th className="pl-6 py-4">
            <Checkbox checked={isSelectedAll} onChange={handelSelectAll} />
          </th>
          {columns.map((column) => (
            <th
              scope="col"
              key={column.id}
              className={clsx('px-6 py-4 text-gray-400 text-xs font-medium', {
                'hover:bg-slate-50 cursor-pointer': column.sortable,
              })}
              onClick={() => column.sortable && onSort(column.id)}
            >
              <div className="flex gap-2">
                <span>{column.title}</span>
                {column.sortable && <Sort />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <div className="w-[calc(100%-24px)] left-1/2 -translate-x-1/2 absolute h-[1px] bg-gray-200"> </div>
      <tbody>
        {sortedItems.map((item) => (
          <tr
            key={item.id}
            className={clsx('hover:bg-slate-100', {
              'bg-slate-100 border-l-4 border-blue-600': selectedIds.includes(item.id),
            })}
          >
            <td className="pl-6 py-6">
              <Checkbox checked={selectedIds.includes(item.id)} onChange={(e) => handleSelect(e, item.id)} />
            </td>
            {columns.map((column) => (
              <td key={column.id} className="px-6 py-6 text-slate-900 text-sm">
                {column.render ? column.render(item) : item[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {selectedIds.length > 0 && <Control onArchive={onArchive} />}
    </table>
  );
}

export default Table;
