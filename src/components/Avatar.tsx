interface Props {
  name: string;
}

function generateColor(input: string): string {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `#${(hash & 0x00ffffff).toString(16)}`;
  return color;
}

export default function Avatar({ name }: Props) {
  return (
    <div
      style={{ backgroundColor: generateColor(name) }}
      className="flex items-center justify-center w-7 h-7 bg-red-500  rounded-full text-white font-medium text-xs"
    >
      {name.split(" ").map((name) => name[0]).join("")}
    </div>
  );
}
