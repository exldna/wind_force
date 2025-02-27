import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request, _ctx: FreshContext) {
    return new Response("healthy", { status: 200 });
  },
  HEAD(_req: Request, _ctx: FreshContext) {
    return new Response(null, { status: 200 });
  },
};
