import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { MdEdit, MdOutlineWaterDrop } from 'react-icons/md';
import { BiBattery } from 'react-icons/bi';

import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import BatteryGauge from '../Battery/Battery';
import { HistoryChart } from '../HistoryChart/HistoryChart';
import { LiquidGauge } from '../LiquidGauge/LiquidGaugue';

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
  const theme = useMantineTheme();
  const context = useContext(AppContext);

  const [date, setDate] = useState(DateTime.now().toJSDate());

  useEffect(() => {
    if (context.devices.length) {
      const selected = context.devices.find((element) => element.id === id);

      if (selected) {
        context.setSelectedDevice(selected);
        setDate(selected.maxDate);
      }
    }
  }, [id, context.devices]);

  if (context.selectedDevice) {
    return (
      <Flex mih={50} gap="md" align="center" direction="column" wrap="wrap">
        <Group
          mb="xl"
          position="center"
          style={{ width: '100%', gap: '10rem' }}
        >
          <Paper
            shadow="xl"
            p="xl"
            style={{ minHeight: '300px', minWidth: '400px' }}
          >
            <Title order={3}>Current Consumption</Title>
            <Divider mt="md" mb="md" />
            <Group spacing="4rem">
              <Stack align="center">
                <Group>
                  <MdOutlineWaterDrop color={theme.colors.blue[8]} size={28} />
                  <Title order={4}>Water</Title>
                </Group>
                <LiquidGauge value={context.selectedDevice?.percentage} />
              </Stack>
              <Stack align="center">
                <Group>
                  <BiBattery color={theme.colors.green[6]} size={28} />
                  <Title order={4}>Battery</Title>
                </Group>
                <BatteryGauge value={context.selectedDevice?.battery} />
              </Stack>
            </Group>
          </Paper>

          <Paper
            shadow="xl"
            p="xl"
            style={{ minHeight: '300px', minWidth: '400px' }}
          >
            <Group w={'100%'} position="apart">
              <Title order={3}>Device Information</Title>
              <Menu position="bottom-start" withArrow arrowSize={10}>
                <Menu.Target>
                  <ActionIcon
                    variant="filled"
                    style={{ backgroundColor: '#EF4B3B' }}
                  >
                    <BsThreeDotsVertical />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<MdEdit size={rem(18)} />}>Editar</Menu.Item>
                  <Menu.Item icon={<BsTrash size={rem(18)} />} color="red">
                    Excluir
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Divider mt="md" mb="md" />
            <Group>
              <Title order={4}>Device Name:</Title>
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
              <Title order={4}>Height:</Title>
              <Text size="lg" color="dimmend">
                2M
              </Text>
            </Group>
            <Group>
              <Title order={4}>Base Radius:</Title>
              <Text size="lg" color="dimmend">
                1.26M
              </Text>
            </Group>
            <Group>
              <Title order={4}>Address:</Title>
              <Text size="lg" color="dimmend">
                Chico mendes 295, Igarassu, Pernambuco
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
            data={filterData(date, context.selectedDevice?.aggregatedHistory)}
            maxCapacity={context.selectedDevice?.maxCapacity}
          />
        </Paper>
      </Flex>
    );
  } else return <></>;
};
