import { useMemo } from "react";
import { Archive, Create, Detail, Download, Redo, Tag, Trash } from '../Icon';
import Tooltip from "../Tooltip/Tooltip";

interface Props {
  onArchive?: () => void
}

export function Control({ onArchive }: Props) {
  const controls = [
    {
      title: 'Archive',
      icon: <Archive />,
      onClick: onArchive,
    },
    {
      title: 'Redo',
      icon: <Redo />,
    },
    {
      title: 'Download',
      icon: <Download />,
    },
    {
      title: 'Detail',
      icon: <Detail />,
    },
    {
      title: 'Tag',
      icon: <Tag />,
    },
    {
      title: 'Create',
      icon: <Create />,
    },
    {
      title: 'Trash',
      icon: <Trash />,
    },
  ];

  return (
    <div className="absolute bottom-4 flex gap-7 left-1/2 px-6 py-1 -translate-x-1/2 shadow bg-sky-950 rounded-full">
      {controls.map((control) => (
        <div
          key={control.title}
          className="p-1 hover:bg-blue-200 hover:bg-opacity-25 rounded-lg cursor-pointer"
          onClick={control.onClick}
        >
          <Tooltip content={control.title}>{control.icon}</Tooltip>
        </div>
      ))}
    </div>
  );
}
