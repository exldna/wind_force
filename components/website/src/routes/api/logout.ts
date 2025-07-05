import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST() {
    const headers = new Headers();
    headers.set("Location", "/login");

    headers.append(
      "Set-Cookie",
      "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
