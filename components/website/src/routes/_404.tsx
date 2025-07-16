import { Head } from "$fresh/runtime.ts";

export default function Error404Page() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32">
          <div class="text-center">
            <p class="text-base font-semibold text-blue-400">404</p>
            <h1 class="mt-4 text-5xl font-semibold tracking-tight text-gray-200 sm:text-7xl">
              Page not found
            </h1>
            <p class="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div class="mt-10 flex justify-center">
              <a href="/" class="btn-primary inline-flex items-center">
                Go back home
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
