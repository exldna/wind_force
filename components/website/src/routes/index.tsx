import { Handlers } from "$fresh/server.ts";
import Schedule from "../islands/schedule.tsx";
import FullLayout from "../components_layout/full_layout.tsx";
import FeatureCard from "../components_pluggable/feature_card.tsx";

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
      <main class="max-w-6xl mx-auto px-4 py-8">
        {/* Расписание */}
        <div class="mb-16">
          <Schedule />
        </div>

        {/* Карточки фич */}
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard icon="🦕" title="Красиво">
            Ещё никогда расписание не выглядело таким приятным и стильным.
          </FeatureCard>

          <FeatureCard icon="⚡" title="Быстро">
            Поражает скоростью загрузки. Гугл Доки позавидуют.
          </FeatureCard>

          <FeatureCard icon="🎨" title="Удобно">
            Надоели грустные таблицы. Встречайте!
          </FeatureCard>
        </div>
      </main>
      {/* Футер */}
    </FullLayout>
  );
}
