import { useState } from "preact/hooks";

interface Props {
  start: number;
}

export default function Counter({ start }: Props) {
  const [count, setCount] = useState(start);

  return (
    <div class="flex items-center space-x-4">
      <button
        onClick={() => setCount(count - 1)}
        class="px-3 py-1 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span class="text-xl">{count}</span>
      <button
        onClick={() => setCount(count + 1)}
        class="px-3 py-1 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
}