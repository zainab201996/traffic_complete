import { useEffect, useState } from "react";

import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import { Flex, Heading, Text } from "@chakra-ui/react";

function App() {
  const [vehicleData, setVehicleData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [countryClicked, setCountryClicked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/traffic-countries")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleBarClick = (id) => {
    fetch(`http://localhost:3000/vehicle-distribution/${id}`)
      .then((response) => response.json())
      .then((data) => {
        countryData.map((item) => {
          if (item.id === id) {
            setSelectedCountry(item.country_name);
          }
        });
        setVehicleData(data);
        setCountryClicked(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {}, [selectedCountry]);
  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      height={{ md: "100vh", base: "100%" }}
      maxHeight={{ md: "100vh", base: "100%" }}
      maxWidth={{ md: "100vw" }}
      width="100vw"
      overflow={"hidden"}
      bg="#d5e7ed"
    >
      <Flex
        position={"absolute"}
        top={0}
        width={"100%"}
        p={4}
        justify={"center"}
        align={"center"}
        bg="#046080"
        height={{ md: "50px", base: "40px" }}
      >
        <Text fontWeight={400} fontSize={{ md: 34, base: 26 }} color="white">
          Traffic Distribution
        </Text>
      </Flex>
      <Flex
        width="100%"
        height={{ md: "100vh", base: "100%" }}
        direction={{ md: "row", base: "column" }}
        alignItems="center"
        justifyContent="center"
        overflow={"hidden"}
        gap={4}
        p={8}
      >
        <Flex
          width="50%"
          height="100%"
          justifyContent={"center"}
          align={"center"}
        >
          <BarChart data={countryData} onBarClick={handleBarClick} />
        </Flex>
        {countryClicked && (
          <Flex justify={"center"} align={"center"} width="50%">
            <PieChart
              data={vehicleData}
              selectedCountry={
                countryData.filter((country, index) => {
                  return country.id === vehicleData[0].traffic_id;
                })[0]
              }
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
