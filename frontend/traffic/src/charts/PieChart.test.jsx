import { render, screen } from "@testing-library/react";

import PieChart from "./PieChart";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { expect } from "vitest";

const testData = [
  { traffic_id: 2, vehicle_count: 1800, vehicle_type: "Car" },
  { traffic_id: 2, vehicle_count: 600, vehicle_type: "Truck" },
];

const testSelecetdCountry = { country_name: "China" };

test("PieChart renders for a country with id 2", () => {
  render(
    <ChakraProvider value={system}>
      <PieChart data={testData} selectedCountry={testSelecetdCountry} />
    </ChakraProvider>
  );

  const text = screen.getByText(
    (content, element) =>
      content.includes("Vehical Distribution for") &&
      element.querySelector("b")?.textContent === "China"
  );
  expect(text).toBeInTheDocument();
});
