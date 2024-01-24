import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { getCookies } from "$std/http/cookie.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { getRecipes, Recipe } from "#api/recipes.ts";
import { Login } from "#components/login.tsx";

interface Data {
  isAllowed: boolean;
  recipes: Recipe[];
}

export const handler: Handlers<Data | null> = {
  async GET(req, ctx): Promise<Response> {
    const cookies = getCookies(req.headers);
    const isAllowed = cookies.auth === "bar";

    const recipes = isAllowed ? await getRecipes() : [];

    const resp = await ctx.render({ isAllowed, recipes });
    return resp;
  },
};

export default function Home(
  { data }: PageProps<Data>,
): JSX.Element {
  const count = useSignal(3);
  // TODO(#2)
  const recipes = data.recipes;
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
      {!data.isAllowed ? <Login /> : <a href="/logout">Logout</a>}
    </div>
  );
}
