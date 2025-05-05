import { render, screen } from "@testing-library/react";
import BarChart from "./BarChart";
import { PieChart } from "recharts";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

const testData = [
  { id: 1, country_name: "Pakistan", vehicle_count: 1200 },
  { id: 2, country_name: "China", vehicle_count: 2400 },
];

test("BarChart renders correctly", () => {
  render(
    <ChakraProvider value={system}>
      <BarChart data={testData} onBarClick={() => {}} />
    </ChakraProvider>
  );
  expect(
    screen.getByText(/Traffic Density Analytics by Country/i)
  ).toBeInTheDocument();
});
