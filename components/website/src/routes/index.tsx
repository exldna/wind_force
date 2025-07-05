import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";

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
        <title>Сила{">>>"}ВетраРасписание</title>
        <meta name="description" content="Играемся с Deno Fresh" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Хедер */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              ⚡ Сила{">>>"}Ветра. Расписание.
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Главная
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 hover:underline">
                    О проекте
                  </a>
                </li>
                <li>
                  <form
                    action="/api/logout"
                    method="POST"
                    className="space-y-6"
                  >
                    <div>
                      <button
                        type="submit"
                        className="text-blue-500 hover:underline"
                      >
                        Выйти
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Основной контент */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          <section className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Добро пожаловать в Расписание!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Здесь можно найти свое расписание, а также изменить его.
            </p>
          </section>
          {/* Карточки фич */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">🦕 Красиво</h3>
              <p className="text-gray-600">
                Ещё никогда расписание не выглядело таким приятным и стильным.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">⚡ Быстрота</h3>
              <p className="text-gray-600">
                Поражает скоростью загрузки. Гугл Доки позавидуют.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">🎨 Удобно</h3>
              <p className="text-gray-600">
                Надоели грустные таблицы. Встречайте!!!
              </p>
            </div>
          </div>
        </main>

        {/* Футер */}
        <footer className="bg-white mt-24 py-8 border-t">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
            <p>Сделано с ❤️ командой, неравнодушной к Силе{">>>"}Ветра.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
