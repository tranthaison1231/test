import { twMerge } from "tailwind-merge";
import { Search as SearchIcon } from "../components/Icon"

type Props = JSX.IntrinsicElements["input"];

function Search({ className = "", ...rest }: Props) {
  return (
    <div className="relative">
      <input
        className={twMerge(
          className,
          "rounded-md p-2 pl-9 placeholder:text-[#8D9196] placeholder:text-xs border border-gray-200",
        )}
        {...rest}
      />
      <SearchIcon className="absolute top-2.5 left-3"/>
    </div>
  );
}

export default Search;
