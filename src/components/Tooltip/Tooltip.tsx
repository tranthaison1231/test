interface Props {
  children: React.ReactNode;
  content: string
}

export default function Tooltip({ children, content } : Props) {
  return (
    <div>
      <span className="group relative">
        <div className="absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 hidden group-hover:block w-auto">
          <div className="bottom-full text-sm font-semibold right-0 rounded bg-black bg-opacity-85 px-4 py-2 text-white whitespace-nowrap">
            {content}
            <svg className="absolute left-0 top-full h-2 w-full text-black" x="0px" y="0px" viewBox="0 0 255 255">
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
        <span>{children}</span>
      </span>
    </div>
  );
}
