import CustomHead from "../components/custom_head.tsx";
import FullLayout from "../components/full_layout.tsx";

export default function About() {
  return (
    <FullLayout>
      <CustomHead title="О нас | Команда Расписания Сила>>>Ветра" />
      {/* Хедер */}
      {/* Ниже Тело | Основной контент*/}
      <div class="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
        <main class="flex-grow flex items-center justify-center">
          <div class="max-w-2xl mx-auto px-4 py-12 text-center">
            <h1 class="text-4xl font-light tracking-wide text-gray-200 mb-8">
              О нас
            </h1>
            <div class="w-24 h-px bg-gray-700 mx-auto mb-8"></div>

            <div class="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
              <p>Это страница "О нас". Всех нас. Спасибо вам!</p>
            </div>

            <div class="mt-12">
              <a
                href="/"
                class="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-light tracking-wide transition-colors duration-300"
              >
                ← Вернуться на главную
              </a>
            </div>
          </div>
        </main>
      </div>
      {/* Футер */}
    </FullLayout>
  );
}
