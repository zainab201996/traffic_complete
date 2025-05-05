import { render, screen } from "@testing-library/react";

import App from "./App";

import { vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, country_name: "Pakistan", vehicle_count: 1200 },
        { id: 2, country_name: "China", vehicle_count: 2400 },
      ]),
  })
);

describe("App", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders traffic distribution", () => {
    render(
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    );
    expect(screen.getByText(/Traffic Distribution/i)).toBeInTheDocument();
  });
});
