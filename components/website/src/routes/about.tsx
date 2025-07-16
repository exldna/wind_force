import FullLayout from "../components_layout/full_layout.tsx";

export default function About() {
  return (
    <FullLayout
      params={{
        head: {
          title: "О нас | Команда Расписания Сила>>>Ветра",
        },
        header: {
          description: "О нас",
        },
      }}
    >
      {/* Голова */}
      {/* Хедер */}
      {/* Ниже Тело | Основной контент*/}
      <main class="flex-grow flex items-center justify-center px-4">
        <div class="max-w-md py-12 text-center">
          <h1 class="text-4xl font-light text-gray-200 mb-6">О нас</h1>

          <div class="w-24 h-px bg-gray-700 mx-auto mb-8" />

          <p class="text-gray-400 font-light mb-10">
            Это страница "О нас". Всех нас. Спасибо вам!
          </p>

          <a href="/" class="btn-primary inline-flex items-center">
            ← На главную
          </a>
        </div>
      </main>
      {/* Футер */}
    </FullLayout>
  );
}
