import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import Schedule from "../islands/schedule.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const cookie = req.headers.get("cookie");
    if (!cookie?.includes("session=authenticated")) {
      return new Response("", {
        status: 307,
        headers: { Location: "/login" },
      });
    }
    return ctx.render();
  },
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Сила{">>>"}Ветра | Расписание</title>
        <meta
          name="description"
          content="Расписание тренировок и мероприятий парусного клуба"
        />
      </Head>

      <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
        {/* Хедер */}
        <header class="py-6 border-b border-gray-800">
          <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-light tracking-wide">
                ⛵ Сила{">>>"}Ветра
              </h1>
              <div class="text-sm text-gray-500 mt-1">Расписание</div>
            </div>

            <nav class="hidden md:block">
              <ul class="flex space-x-8">
                <li>
                  <a
                    href="/"
                    class="text-gray-300 hover:text-white transition-colors font-light"
                  >
                    Главная
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="text-gray-500 hover:text-gray-300 transition-colors font-light"
                  >
                    О проекте
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

          {/* Мобильное меню */}
          <nav class="md:hidden mt-4">
            <div class="max-w-6xl mx-auto px-4">
              <ul class="flex justify-around">
                <li>
                  <a
                    href="/"
                    class="block py-2 px-4 text-gray-300 rounded-lg font-light"
                  >
                    Главная
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="block py-2 px-4 text-gray-500 rounded-lg font-light"
                  >
                    О проекте
                  </a>
                </li>
                <li>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      class="block py-2 px-4 text-blue-400 rounded-lg font-light"
                    >
                      Выйти
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Основной контент */}
        <main class="max-w-6xl mx-auto px-4 py-8">
          {/* <section class="mb-12 text-center">
            <h2 class="text-3xl font-light tracking-wide text-gray-200 mb-4">
              Расписание тренировок и мероприятий
            </h2>
            <div class="w-24 h-px bg-gray-700 mx-auto mt-4"></div>
          </section> */}

          {/* Расписание */}
          <div class="mb-16">
            <Schedule />
          </div>

          {/* Карточки фич */}
          <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 class="font-light text-xl mb-3 text-gray-200">🦕 Красиво</h3>
              <p class="text-gray-400 font-light">
                Ещё никогда расписание не выглядело таким приятным и стильным.
              </p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 class="font-light text-xl mb-3 text-gray-200">⚡ Быстро</h3>
              <p class="text-gray-400 font-light">
                Поражает скоростью загрузки. Гугл Доки позавидуют.
              </p>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 class="font-light text-xl mb-3 text-gray-200">🎨 Удобно</h3>
              <p class="text-gray-400 font-light">
                Надоели грустные таблицы. Встречайте!
              </p>
            </div>
          </div>
        </main>

        {/* Футер */}
        <footer class="mt-24 py-8 border-t border-gray-800">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-gray-500 font-light">
              Сделано с ❤️ командой, неравнодушной к "Сила{">>>"}Ветра"
            </p>
            <p class="text-gray-600 text-sm mt-2 font-light">
              © {new Date().getFullYear()} Все права защищены
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
