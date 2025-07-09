import { Head } from "$fresh/runtime.ts";

interface HeadParams {
  title?: string;
  description?: string;
}

export default function CustomHead({
  title = "Сила>>>Ветра | Расписание", // дефолтное название страницы
  description = "Расписание тренировок и мероприятий парусного клуба",
}: HeadParams) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
