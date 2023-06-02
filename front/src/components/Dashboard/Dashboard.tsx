import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
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
import { BiBattery } from 'react-icons/bi';
import { BsCalendar3, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { MdEdit, MdOutlineWaterDrop } from 'react-icons/md';

import { notifications } from '@mantine/notifications';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, IDevice } from '../../contexts/AppContext';
import useDevice from '../../services/useDevice';
import BatteryGauge from '../Battery/Battery';
import { EditDeviceModal } from '../EditDeviceModal/EditDeviceModal';
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
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { deleteDevice } = useDevice();

  const theme = useMantineTheme();
  const { devices } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);

  const handleClose = () => setOpen(false);

  const handleDelete = (id: string) => {
    deleteDevice(id)
      .then(() => {
        queryClient.invalidateQueries('allDevices').then(() => {
          notifications.show({
            color: 'green',
            title: 'Success',
            message: 'Device removed successfully',
          });
          navigate('/');
        });
      })
      .catch((error) => {
        console.log({ error });
        notifications.show({
          color: 'red',
          title: 'Error',
          message: error.message,
        });
      });
  };

  useEffect(() => {
    if (devices.length) {
      const selected = devices.find((element) => element.id === id);

      if (selected) {
        setSelectedDevice(selected);
      }
    }
  }, [id, devices]);

  useEffect(() => {
    if (devices.length) {
      const selected = devices.find((element) => element.id === id);

      if (selected) {
        setSelectedDevice(selected);
      }
    }
  }, []);

  if (selectedDevice) {
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
            <Title order={3} color="#EF4B3B">
              Current Consumption
            </Title>
            <Divider mt="md" mb="md" />
            <Group spacing="4rem">
              <Stack align="center">
                <Group spacing={'xs'}>
                  <MdOutlineWaterDrop color={theme.colors.blue[8]} size={28} />
                  <Title order={5}>Water Level</Title>
                </Group>
                <LiquidGauge value={selectedDevice?.percentage} />
              </Stack>
              <Stack align="center">
                <Group spacing={'xs'}>
                  <BiBattery color={theme.colors.green[6]} size={28} />
                  <Title order={5}>Battery Level</Title>
                </Group>
                <BatteryGauge value={selectedDevice?.battery} />
              </Stack>
            </Group>
          </Paper>

          <Paper
            shadow="xl"
            p="xl"
            style={{ minHeight: '300px', minWidth: '400px', maxWidth: '500px' }}
          >
            <Group w={'100%'} position="apart">
              <Title order={3} color="#EF4B3B">
                Reservatory Information
              </Title>
              <Menu position="bottom-start" withArrow arrowSize={10}>
                <Menu.Target>
                  <ActionIcon
                    variant="filled"
                    style={{ backgroundColor: '#1A2F48' }}
                  >
                    <BsThreeDotsVertical />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<MdEdit size={rem(18)} />}
                    onClick={() => setOpen(true)}
                  >
                    Edit
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>

                  <Menu.Item
                    icon={<BsTrash size={rem(18)} />}
                    color="red"
                    onClick={() => {
                      handleDelete(selectedDevice.id);
                    }}
                  >
                    Delete Device
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
            <Divider mt="md" mb="md" />
            <Grid>
              <Grid.Col span={6}>
                <Group spacing={'xs'}>
                  <Title order={5}>Device Name:</Title>
                  <Text color="dimmend">{selectedDevice?.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group spacing="sm">
                  <Title order={5}>Mac:</Title>
                  <Text color="dimmend">{selectedDevice?.mac}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group spacing={'xs'}>
                  <Title order={5}>Address:</Title>
                  <Text color="dimmend">
                    Chico mendes 295, Igarassu, Pernambuco
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={6}>
                <Group spacing={'xs'}>
                  <Title order={5}>Height:</Title>
                  <Text color="dimmend">2M</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group spacing={'xs'}>
                  <Title order={5}>Base Radius:</Title>
                  <Text color="dimmend">1.26M</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group spacing={'xs'}>
                  <Title order={5}>Current Volume:</Title>
                  <Text color="dimmend">{selectedDevice?.water}L</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group spacing={'xs'}>
                  <Title order={5}>Max Volume:</Title>
                  <Text size="md" color="dimmend">
                    {selectedDevice?.maxCapacity}L
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Paper>
        </Group>

        <Paper shadow="xl" p="xl">
          <Group w={'100%'} position="apart">
            <Title order={3} color="#EF4B3B">
              History Consumption
            </Title>
            <MonthPickerInput
              icon={<BsCalendar3 size="1.1rem" />}
              w={200}
              label="Select Month"
              value={date || selectedDevice.maxDate}
              onChange={(value: Date) =>
                setDate(DateTime.fromJSDate(value).toJSDate())
              }
              minDate={selectedDevice?.minDate}
              maxDate={selectedDevice?.maxDate}
            />
          </Group>
          <Divider mt="md" mb="md" />
          <HistoryChart
            data={filterData(
              date || selectedDevice.maxDate,
              selectedDevice?.aggregatedHistory
            )}
            maxCapacity={selectedDevice?.maxCapacity}
          />
        </Paper>
        <EditDeviceModal
          opened={open}
          device={selectedDevice}
          onClose={handleClose}
        />
      </Flex>
    );
  } else return <></>;
};
