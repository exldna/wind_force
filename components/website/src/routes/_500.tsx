import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Error500Page({ error }: PageProps) {
  return (
    <>
      <Head>
        <title>500 - Internal error</title>
      </Head>
      <p>500 internal error: {(error as Error).message}</p>
    </>
  );
}
