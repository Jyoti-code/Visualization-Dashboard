import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, useColorModeValue, Select } from "@chakra-ui/react";

const PieChart = ({ data }) => {
  const [selectedEndYear, setSelectedEndYear] = useState("All");

  const endYears = ['All', ...new Set(data.map(entry => entry.end_year))].filter(year => year !== null);

  const filteredData = selectedEndYear === "All" ? data : data.filter(entry => entry.end_year === selectedEndYear);

  const years = {};

  filteredData.forEach((entry) => {
    const yearKey = `${entry.start_year}-${entry.end_year}`;
    if (!years[yearKey]) {
      years[yearKey] = 0;
    }
    years[yearKey] += entry.intensity;
  });

  const getRandomColor = (index) => {
    const colors = [
      "#FF0080",
      "#00BFFF",
      "#FFD700",
      "#32CD32",
      "#FF4500",
      "#9400D3",
    ];
    return colors[index % colors.length];
  };

  const chartData = {
    labels: Object.keys(years),
    datasets: [
      {
        data: Object.values(years),
        backgroundColor: Object.keys(years).map((_, index) =>
          getRandomColor(index)
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "average",
      },
    },
  };

  const handleEndYearChange = (event) => {
    setSelectedEndYear(event.target.value); 
  };

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Heading as="h2" mb={4}>
        Year Chart
      </Heading>
      <Select value={selectedEndYear} onChange={handleEndYearChange}>
        {endYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>

      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
};

export default PieChart;
