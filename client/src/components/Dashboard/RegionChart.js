import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Heading, Select } from '@chakra-ui/react';

const RegionChart = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', ...new Set(data.map(item => item.region))];

  const filteredData = selectedRegion === 'All' ? data : data.filter(item => item.region === selectedRegion);

  const regionCounts = {};
  filteredData.forEach(item => {
    if (item.region in regionCounts) {
      regionCounts[item.region]++;
    } else {
      regionCounts[item.region] = 1;
    }
  });

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
      },
    ],
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Region Distribution
      </Heading>
      <Select value={selectedRegion} onChange={handleRegionChange}>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </Select>
      <Doughnut data={chartData} />
    </Box>
  );
};

export default RegionChart;
