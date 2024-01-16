import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return <div className={twMerge("bg-white rounded-md border p-4", className)}> {children}</div>;
}

export default Card;
