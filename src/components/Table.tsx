import { ReactNode } from "react";
import Checkbox from "./Checkbox";
import Control from "./Control";
import clsx from 'clsx';

interface Column<DataType> {
  id: string;
  title: string;
  render?: (column: DataType) => React.ReactNode;
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

  return (
    <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs border-b border-[#E8E9EB]">
        <tr>
          <th>
            <Checkbox checked={isSelectedAll} onChange={handelSelectAll} />
          </th>
          {columns.map((column) => (
            <th scope="col" key={column.id} className="px-6 py-3 text-gray-400 text-xs font-medium">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={clsx('hover:bg-slate-100', {
              'bg-slate-100': selectedIds.includes(item.id),
            })}
          >
            <td>
              <Checkbox checked={selectedIds.includes(item.id)} onChange={(e) => handleSelect(e, item.id)} />
            </td>
            {columns.map((column) => (
              <td key={column.id} className="px-6 py-4 text-slate-900 text-sm">
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
