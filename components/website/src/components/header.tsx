export default function Header() {
  return (
    <header class="py-6 border-b border-gray-800">
      <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-light tracking-wide">⛵ Сила{">>>"}Ветра</h1>
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
                О нас
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
  );
}
