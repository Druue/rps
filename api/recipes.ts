import Recipes from "#examples/recipes.json" with { type: "json" };

export type Recipe = {
  name: string;
  author: string;
  blurb: string;
  ingredients: Ingredient[];
  method: string[];
};

export type Ingredient = {
  name: string;
  measurement: Measurement;
};

export type Measurement = {
  amount: number;
  unit?: string;
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const json = JSON.stringify(Recipes);
  return await JSON.parse(json);
};
