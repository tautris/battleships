import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";

test("renders the App without crashing", () => {
  render(<App />);
});

test("check battleships placement", () => {
  // expect(validateShipPlacement([0, 1, 2, 3])).toBe("OK");
  // expect(validateShipPlacement([0, 2, 4, 6, 7])).toBe("1");
});
