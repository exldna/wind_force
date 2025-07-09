import { Head } from "$fresh/runtime.ts";

interface HeadParams {
  title?: string;
  description?: string;
}

export default function CustomHead({ params = {} }: { params?: HeadParams }) {
  const {
    title = "Сила>>>Ветра | Расписание",
    description = "Расписание тренировок и мероприятий парусного клуба",
  } = params || {};

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}
