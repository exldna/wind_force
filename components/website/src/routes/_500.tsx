import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Error500Page({ error }: PageProps) {
  return (
    <>
      <Head>
        <title>500 - Internal error</title>
      </Head>

      <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32">
          <div class="text-center">
            <p class="text-base font-semibold text-blue-400">500</p>
            <h1 class="mt-4 text-5xl font-semibold tracking-tight text-gray-200 sm:text-7xl">
              Something went wrong.
            </h1>
            <p class="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
              Sorry, It's not you. It's us.
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
