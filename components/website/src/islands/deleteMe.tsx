// islands/MainInteractiveBlock.tsx
import { useState } from "preact/hooks";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function MainInteractiveBlock() {
  // Все состояния здесь
  const [name, setName] = useState("Брат");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0); // Добавили состояние для счётчика

  // Загрузка задач с API
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="max-w-2xl mx-auto p-4 space-y-8">
      {/* 1. Инпут имени */}
      <section>
        <h1 class="text-3xl font-bold text-blue-600 mb-2">Привет, {name}!</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          class="border p-2 rounded w-full"
          placeholder="Введи своё имя"
        />
      </section>

      {/* 2. Кнопка загрузки задач */}
      <section>
        <button
          onClick={fetchTodos}
          disabled={isLoading}
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Загрузка..." : "Загрузить задачи"}
        </button>
        <ul class="mt-4 space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} class="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                class="mr-2"
                readOnly
              />
              <span class={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Счётчик */}
      <section class="p-4 bg-gray-100 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Счётчик</h2>
        <div class="flex items-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            class="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            -
          </button>
          <span class="text-2xl font-bold min-w-[3rem] text-center">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            class="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}
