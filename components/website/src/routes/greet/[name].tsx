import { PageProps } from "$fresh/server.ts";

export default function GreetPage({ params }: PageProps) {
  return (
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">
        Привет, <span class="text-blue-600">{params.name}</span>!
      </h1>
      <a href="/" class="text-blue-500 hover:underline">
        ← На главную
      </a>
    </div>
  );
}