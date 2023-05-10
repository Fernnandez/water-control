import {
  AppShell,
  Box,
  Button,
  Center,
  Header,
  Navbar,
  Progress,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AppContext, IDevice } from '../../contexts/AppContext';
import useDevice from '../../services/useDevice';
import { DeviceCard } from '../DeviceCard/DeviceCard';
import { CreateDeviceModal } from '../CreateDeviceModal/CreateDeviceModal';

interface NavigationProps {
  children?: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  const { setDevices } = useContext(AppContext);
  const { getAll } = useDevice();
  const devicesQuery = useQuery(['allDevices'], getAll, {
    refetchInterval: 10 * 1000,
    onSuccess: (data) => {
      setDevices(data);
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
          width={{ base: 250 }}
          sx={{
            margin: '10px',
            paddingRight: '5px',
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
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
                      battery={device.battery}
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
        <Header height={10}>
          <Progress
            value={progress}
            color="orange"
            style={{ width: '100%', borderRadius: 0, padding: 0, height: 10 }}
          />
        </Header>
      }
    >
      {children}
      <CreateDeviceModal onClose={handleClose} opened={open} />
    </AppShell>
  );
};
