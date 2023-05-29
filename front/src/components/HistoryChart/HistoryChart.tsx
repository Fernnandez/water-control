import { Box, Paper, Space, Text } from '@mantine/core';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AggregatedDeviceHistory } from '../../contexts/AppContext';

const toPercent = (decimal: number, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

export const HistoryChart = ({
  data,
  maxCapacity,
}: {
  data: AggregatedDeviceHistory[];
  maxCapacity: number;
}) => {
  const batteryTooltip = (o: any) => {
    const { payload, label } = o;

    return (
      <Paper shadow="lg" p="sm" className="customized-tooltip-content">
        {payload.map((entry: any, index: any) => (
          <Text key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${getPercent(entry.value, 100)}`}
          </Text>
        ))}
        <Space h="sm" />
        <Text c="dimmed">date: {label}</Text>
      </Paper>
    );
  };

  const volumeTooltip = (o: any) => {
    const { payload, label } = o;

    return (
      <Paper shadow="lg" p="sm" className="customized-tooltip-content">
        {payload.map((entry: any, index: any) => (
          <Text key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}L (${getPercent(
              entry.value,
              maxCapacity
            )})`}
          </Text>
        ))}
        <Space h="sm" />
        <Text c="dimmed">date: {label}</Text>
      </Paper>
    );
  };

  return (
    <Box>
      <AreaChart
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
        <ReferenceLine y={maxCapacity} label="Max Capacity" stroke="blue" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={volumeTooltip} />
        <Legend />
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>

      <AreaChart
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
        <ReferenceLine y={100} stroke="green" />
        <YAxis />
        <Tooltip content={batteryTooltip} />
        <Legend />
        <Area
          type="monotone"
          dataKey="battery"
          stroke="#82ca9d"
          fill="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </Box>
  );
};
