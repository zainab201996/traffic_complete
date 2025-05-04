import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  elements,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const BarChart = ({ data, onBarClick }) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const [barClickedIndex, setBarClickedIndex] = useState(null);
  const chartData = {
    labels: data.map((item) => item.country_name),
    datasets: [
      {
        label: "Vehicle Count",
        data: data.map((item) => item.vehicle_count),
        backgroundColor: data.map((_, index) =>
          index === barClickedIndex ? "#064a61" : "#5bb9d9"
        ),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setBarClickedIndex(index);
        onBarClick(data[index].id);
      }
    },
  };

  return (
    <Flex
      width={{ md: "600px", base: "300px" }}
      height={{ md: "410px", base: "280px" }}
      direction={"column"}
      p={2}
    >
      <Bar data={chartData} options={options} />
      <Text
        border={"0.5px solid gray"}
        p={2}
        width="100%"
        fontSize={{ md: 20, base: 10 }}
        textAlign={"center"}
        fontWeight={100}
        bg="#046080"
        color={"white"}
        borderRadius={5}
      >
        Traffic Density Analytics by Country
      </Text>
    </Flex>
  );
};

export default BarChart;
