import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className }: Props) {
  return (
    <button
      data-testid="button"
      className={twMerge('bg-white rounded-md border p-2 h-9 flex items-center shadow border-slate-200', className)}
    >
      {children}
    </button>
  );
}

