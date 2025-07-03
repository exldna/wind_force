import { Head } from "$fresh/runtime.ts";
import MainInteractiveBlock from "../islands/deleteMe.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Playground</title>
        <meta name="description" content="Играемся с Deno Fresh" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Хедер */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              🦕 Fresh Playground
            </h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">Главная</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 hover:underline">О проекте</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Основной контент */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          <section className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Добро пожаловать в песочницу!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Здесь можно тестировать возможности Fresh: интерактивные компоненты, 
              работу с API и другие фишки.
            </p>
          </section>

          {/* Интерактивный блок */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <MainInteractiveBlock />
          </div>

          {/* Карточки фич */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">🦕 Острова</h3>
              <p className="text-gray-600">
                Интерактивные компоненты работают только в папке islands/
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">⚡ Быстрота</h3>
              <p className="text-gray-600">
                Fresh использует Preact и работает на сервере Deno
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">🎨 Tailwind</h3>
              <p className="text-gray-600">
                Стилизуй элементы прямо в JSX с помощью утилит-классов
              </p>
            </div>
          </div>
        </main>

        {/* Футер */}
        <footer className="bg-white mt-24 py-8 border-t">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
            <p>Сделано с ❤️ на Deno Fresh</p>
          </div>
        </footer>
      </div>
    </>
  );
}