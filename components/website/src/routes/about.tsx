import { Head } from "$fresh/runtime.ts";

export default function About() {
  return (
    <>
      <Head>
        <title>О нас | Команда Расписания Сила{">>>"}Ветра</title>
      </Head>

      <div class="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
        {/* Хедер */}
        <header class="py-6 border-b border-gray-800">
          <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-light tracking-wide">
                ⛵ Сила{">>>"}Ветра
              </h1>
              <div class="text-sm text-gray-500 mt-1">О команде</div>
            </div>

            <nav class="hidden md:block">
              <ul class="flex space-x-8">
                <li>
                  <a
                    href="/"
                    class="text-gray-500 hover:text-gray-300 transition-colors font-light"
                  >
                    Главная
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="text-gray-300 hover:text-white transition-colors font-light"
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      class="text-blue-400 hover:text-blue-300 transition-colors font-light"
                    >
                      Выйти
                    </button>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Основной контент */}
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

        {/* Футер */}
        <footer class="py-6 border-t border-gray-800">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-gray-500 font-light">
              © {new Date().getFullYear()} Сделано с ❤️ командой, неравнодушной
              к "Сила{">>>"}Ветра"
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
