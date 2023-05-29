import {
  AppShell,
  Button,
  Center,
  Header,
  Navbar,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AppContext, IDevice } from '../../contexts/AppContext';
import useDevice from '../../services/useDevice';
import { CreateDeviceModal } from '../CreateDeviceModal/CreateDeviceModal';
import { DeviceCard } from '../DeviceCard/DeviceCard';

interface NavigationProps {
  children?: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  const { setDevices } = useContext(AppContext);
  const { getAll } = useDevice();
  const devicesQuery = useQuery(['allDevices'], getAll, {
    refetchInterval: 10 * 1000,
    onSuccess: (data) => {
      const newData = data.map((device: IDevice) => {
        return {
          ...device,
          minDate: DateTime.fromFormat(
            device.aggregatedHistory[0].date,
            'dd/MM/yy'
          ).toJSDate(),
          maxDate: DateTime.fromFormat(
            device.aggregatedHistory[device.aggregatedHistory.length - 1].date,
            'dd/MM/yy'
          ).toJSDate(),
        };
      });
      setDevices(newData);
    },
  });

  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 5);
      } else {
        setProgress(0);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <AppShell
      navbar={
        <Navbar
          width={{ base: 200 }}
          height={'100vh'}
          sx={{
            margin: '10px',
            paddingRight: '5px',
          }}
        >
          <Navbar.Section>
            <Stack>
              <Button onClick={() => setOpen(true)}>New Device</Button>
              {devicesQuery.isLoading && <Text>Carregando...</Text>}
              {devicesQuery.data &&
                devicesQuery.data.length > 0 &&
                devicesQuery.data.map((device: IDevice) => {
                  return (
                    <DeviceCard
                      uuid={device.id}
                      name={device.name}
                      key={device.id}
                    />
                  );
                })}
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={40} bg="blue">
          <Center>
            <Title order={2} color="white">
              AQUAMON
            </Title>
          </Center>
        </Header>
      }
    >
      {children}
      <CreateDeviceModal onClose={handleClose} opened={open} />
    </AppShell>
  );
};
