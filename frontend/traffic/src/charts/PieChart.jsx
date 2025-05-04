import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PieController,
} from "chart.js";
import { Box, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PieController
);

const PieChart = ({ data, selectedCountry }) => {
  const chartData = {
    labels: data.map((item) => item.vehicle_type),
    datasets: [
      {
        label: "Vehicle Distribution",
        data: data.map((item) => item.vehicle_count),
        backgroundColor: ["#a1edd8", "#a1ede9", "#d1a1ed", "#eda1c2"],
      },
    ],
  };
  useEffect(() => {
    console.log(selectedCountry);
  }, [selectedCountry]);
  return (
    <Flex
      justify={"center"}
      align="center"
      width={{ md: "400px", base: "250px" }}
      height="100%"
      direction={"column"}
      position={"relative"}
      mt={10}
    >
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Vehicle Distribution" },
          },
        }}
      />
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
        Vehical Distribution for <b>{selectedCountry.country_name}</b>
      </Text>
    </Flex>
  );
};

export default PieChart;
