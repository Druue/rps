import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";

import { getRecipes, Recipe } from "../api/recipes.ts";

export const handler: Handlers<Recipe[] | null> = {
  async GET(_req, ctx): Promise<Response> {
    const recipes = await getRecipes();

    const resp = await ctx.render(recipes);
    return resp;
  },
};

export default function Home(props: PageProps<Recipe[]>): JSX.Element {
  const count = useSignal(3);
  // TODO(#2)
  const recipes = props.data;
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="Logo"
        />
        <h1 class="text-4xl font-bold">Welcome!</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
      </div>
    </div>
  );
}
