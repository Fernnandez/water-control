import { Box } from '@mantine/core';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const HistoryChart = ({ data }: { data: any | undefined }) => {
  return (
    <Box>
      <LineChart
        width={1000}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="volume"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <LineChart
        width={1000}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 6" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="battery"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Box>
  );
};
