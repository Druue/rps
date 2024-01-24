import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req): Promise<Response> {
    const url = new URL(req.url);
    const form = await req.formData();
    // TODO(@druue) use non-hardcoded values
    if (form.get("username") === "deno" && form.get("password") === "land") {
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: "bar", // TODO(@druue) this should be a unique value for each session
        maxAge: 120,
        sameSite: "Lax", // ! this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};
