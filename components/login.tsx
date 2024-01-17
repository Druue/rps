import { JSX } from "preact/jsx-runtime";

export function Login(): JSX.Element {
  // TODO(@druue) make this actually nice
  return (
    <form method="post" action="/login">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
