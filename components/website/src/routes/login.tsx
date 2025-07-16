import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function LoginPage({ url }: PageProps) {
  const error = url.searchParams.get("error");

  return (
    <>
      <Head>
        <title>Вход | Сила{">>>"}Ветра</title>
      </Head>

      <div class="min-h-screen bg-gray-900 flex flex-col">
        <main class="flex-grow flex items-center justify-center py-8 px-4">
          <div class="w-full max-w-md">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-light text-gray-100 mb-3">
                ⛵ Сила{">>>"}Ветра
              </h1>
              <div class="w-16 h-px bg-gray-700 mx-auto"></div>
            </div>

            <div class="card p-6 sm:p-8">
              <h2 class="text-xl font-light text-center text-gray-200 mb-6">
                Вход в расписание
              </h2>

              {error && (
                <div class="mb-5 p-3 bg-red-900 text-red-100 rounded-lg text-center text-sm">
                  {decodeURIComponent(error)}
                </div>
              )}

              <form action="/api/login" method="POST" class="space-y-5">
                <div>
                  <label for="email" class="block text-gray-400 mb-2 pl-1">
                    Электронная почта
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autocomplete="email"
                    class="login-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <div class="flex justify-between mb-2 pl-1">
                    <label for="password" class="block text-gray-400">
                      Пароль
                    </label>
                    <a
                      href="#"
                      class="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autocomplete="current-password"
                    class="login-input"
                    placeholder="••••••••"
                  />
                </div>

                <button type="submit" class="login-btn">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </main>

        <footer class="py-6 border-t border-gray-800 text-center">
          <p class="text-gray-600 text-sm">
            © {new Date().getFullYear()} Сделано с ❤️ командой, неравнодушной к
            "Сила{">>>"}Ветра"
          </p>
        </footer>
      </div>
    </>
  );
}
