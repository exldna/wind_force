import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function LoginPage({ url }: PageProps) {
  const error = url.searchParams.get("error");

  return (
    <>
      <Head>
        <title>Вход | Сила{">>>"}Ветра</title>
        <style>{`
          @media (max-height: 700px) {
            .login-container {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
            .login-footer {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
          }
        `}</style>
      </Head>

      <div class="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
        <div class="flex-grow flex items-center justify-center login-container">
          <div class="w-full max-w-md px-6 py-8">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-light tracking-wide text-gray-100 mb-3">
                ⛵ Сила{">>>"}Ветра
              </h1>
              <div class="w-16 h-px bg-gray-700 mx-auto"></div>
            </div>

            <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 shadow-lg">
              <h2 class="text-xl sm:text-2xl font-light text-center text-gray-200 mb-6">
                Вход в расписание
              </h2>

              {error && (
                <div class="mb-5 p-3 bg-red-900 text-red-100 rounded-lg text-center font-light text-sm sm:text-base">
                  {decodeURIComponent(error)}
                </div>
              )}

              <form action="/api/login" method="POST" class="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    class="block text-gray-400 font-light mb-2 pl-1 text-sm sm:text-base"
                  >
                    Электронная почта
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 font-light focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-500 text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <div class="flex justify-between mb-2 pl-1">
                    <label
                      htmlFor="password"
                      class="block text-gray-400 font-light text-sm sm:text-base"
                    >
                      Пароль
                    </label>
                    <a
                      href="#"
                      class="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors font-light"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 font-light focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-500 text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-light tracking-wide transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    Войти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer class="py-6 border-t border-gray-800 login-footer">
          <div class="max-w-md mx-auto px-6 text-center">
            <p class="text-gray-600 text-xs sm:text-sm font-light">
              © {new Date().getFullYear()} Сделано с ❤️ командой, неравнодушной
              к "Сила{">>>"}Ветра"
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}