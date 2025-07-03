import { Head } from "$fresh/runtime.ts";

export default function About() {
  return (
    <>
      <Head>
        <title>О нас</title>
      </Head>
      <div class="max-w-2xl mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">О нас</h1>
        <p class="mb-4">
          Это страница "О нас". Всех нас.
          Спасибо вам!
        </p>
        <a href="/" class="text-blue-500 hover:underline">
          ← На главную
        </a>
      </div>
    </>
  );
}