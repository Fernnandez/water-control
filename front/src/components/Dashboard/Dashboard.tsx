import { Divider, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import BatteryGauge from '../Battery/Battery';
import { HistoryChart } from '../HistoryChart/HistoryChart';
import LiquidGauge from '../Liquid/Liquid';
import { DateTime } from 'luxon';

const filterData = (date: Date, data: any) => {
  if (!data) return [];
  return data.filter((item: any) => {
    return (
      DateTime.fromFormat(item.date, 'dd/MM/yy').month ===
        DateTime.fromJSDate(date).month &&
      DateTime.fromFormat(item.date, 'dd/MM/yy').year ===
        DateTime.fromJSDate(date).year
    );
  });
};

export const Dashboard = () => {
  const { id } = useParams();
  const context = useContext(AppContext);

  const [date, setDate] = useState(DateTime.now().toJSDate());

  useEffect(() => {
    if (context.devices.length) {
      const selected = context.devices.find((element) => element.id === id);

      if (selected) context.setSelectedDevice(selected);
    }
  }, [id, context.devices]);

  if (context.selectedDevice) {
    return (
      <Flex
        mih={50}
        gap="md"
        align="center"
        direction="column"
        wrap="wrap"
        style={{ height: '100%' }}
      >
        <Group
          mb="xl"
          position="center"
          style={{ width: '100%', gap: '10rem' }}
        >
          <Paper shadow="xl" p="xl">
            <Title order={3}>Current Consumption</Title>
            <Divider mt="md" mb="md" />
            <Group spacing="4rem">
              <Stack align="center">
                <Title order={4}>Water</Title>
                <LiquidGauge value={context.selectedDevice?.percentage} />
              </Stack>
              <Stack align="center">
                <Title order={4}>Battery</Title>
                <BatteryGauge value={context.selectedDevice?.battery} />
              </Stack>
            </Group>
          </Paper>

          <Paper shadow="xl" p="xl">
            <Title order={3}>Device Information</Title>
            <Divider mt="md" mb="md" />
            <Group>
              <Title order={4}>Selected Device:</Title>
              <Text size="lg" color="dimmend">
                {context.selectedDevice?.name}
              </Text>
            </Group>
            <Group>
              <Title order={4}>Mac Address:</Title>
              <Text size="lg" color="dimmend">
                {context.selectedDevice?.mac}
              </Text>
            </Group>
            <Group>
              <Title order={4}>Max Capacity:</Title>
              <Text size="lg" color="dimmend">
                {context.selectedDevice?.maxWater} L
              </Text>
            </Group>
            <Group>
              <Title order={4}>Current Volume:</Title>
              <Text size="lg" color="dimmend">
                {context.selectedDevice?.water} L
              </Text>
            </Group>
          </Paper>
        </Group>

        <Paper shadow="xl" p="xl">
          <Group w={'100%'} position="apart">
            <Title order={3} mb="lg">
              History Consumption
            </Title>
            <MonthPickerInput
              w={200}
              label="Select Month"
              value={date}
              onChange={(value: Date) =>
                setDate(DateTime.fromJSDate(value).toJSDate())
              }
              minDate={context.selectedDevice?.minDate}
              maxDate={context.selectedDevice?.maxDate}
            />
          </Group>
          <Divider mt="md" mb="md" />
          <HistoryChart
            data={filterData(date, context.selectedDevice?.history)}
          />
        </Paper>
      </Flex>
    );
  }
};
