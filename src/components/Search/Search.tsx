import { twMerge } from "tailwind-merge";
import { Search as SearchIcon } from "../Icon"

type Props = JSX.IntrinsicElements["input"];

export function Search({ className = "", ...rest }: Props) {
  return (
    <div className="relative">
      <input
        data-testid="search-input"
        className={twMerge(
          className,
          "rounded-md p-2 pl-9 placeholder:text-[#8D9196] placeholder:text-xs border border-gray-200",
        )}
        {...rest}
      />
      <SearchIcon data-testid="search-icon" className="absolute top-2.5 left-3"/>
    </div>
  );
}

