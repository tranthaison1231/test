import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <div data-testid="card" className={twMerge('bg-white rounded-md border p-4', className)}>
      {children}
    </div>
  );
}

export default Card;
