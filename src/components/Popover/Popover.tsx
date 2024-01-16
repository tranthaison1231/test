import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useClickOutSide';

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Popover({ content, children }: Props) {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const openPopover = () => {
    setIsOpen(true);
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="relative">
      <div onClick={openPopover}>{children}</div>
      <div ref={ref} className={clsx("absolute bg-white z-50  shadow-2xl border top-10 right-0 w-fit", {
        "hidden": !isOpen
      })}>
        {content}
      </div>
    </div>
  );
}
