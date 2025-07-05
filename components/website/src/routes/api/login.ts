import { Handlers } from "$fresh/server.ts";

const VALID_CREDENTIALS = {
  email: "user@example.com",
  password: "securepassword",
};

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      const headers = new Headers();
      headers.set("Location", "/");

      headers.append(
        "Set-Cookie",
        "session=authenticated; Path=/; HttpOnly; SameSite=Lax"
      );

      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      const headers = new Headers();
      headers.set("Location", "/login?error=Invalid+credentials");
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};
