import { render } from "@testing-library/react";
import { App } from "./App";

test("Renders the App without crashing", () => {
  render(<App />);
});
