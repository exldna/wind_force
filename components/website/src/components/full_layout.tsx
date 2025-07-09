import Header from "./header.tsx";
import Footer from "./footer.tsx";
import { Head } from "$fresh/runtime.ts";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Сила{">>>"}Ветра | Расписание</title>
        <meta
          name="description"
          content="Расписание тренировок и мероприятий парусного клуба"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
