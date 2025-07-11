import { Handlers } from "$fresh/server.ts";
import Schedule from "../islands/schedule.tsx";
import FullLayout from "../components_layout/full_layout.tsx";

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
    <FullLayout>
      {/* Голова */}
      {/* Хедер */}
      {/* Ниже Тело | Основной контент*/}
      <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
        <main class="max-w-6xl mx-auto px-4 py-8">

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
      </div>
      {/* Футер */}
    </FullLayout>
  );
}
