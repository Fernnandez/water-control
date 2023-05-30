import {
  AppShell,
  Button,
  Flex,
  Header,
  Image,
  Navbar,
  Stack,
  Text,
} from '@mantine/core';
import { DateTime } from 'luxon';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-white.svg';
import { AppContext, IDevice } from '../../contexts/AppContext';
import useDevice from '../../services/useDevice';
import { CreateDeviceModal } from '../CreateDeviceModal/CreateDeviceModal';
import { DeviceCard } from '../DeviceCard/DeviceCard';

interface NavigationProps {
  children?: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  const { setDevices, setSelectedDevice } = useContext(AppContext);
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
      style={{ height: 'calc(100vh - 60px)', width: '100%' }}
      navbar={
        <Navbar
          width={{ base: 250 }}
          height={'100vh'}
          sx={{
            padding: '10px',
            backgroundColor: '#EEF1FF',
          }}
        >
          <Navbar.Section>
            <Stack>
              <Button bg="#1A2F48" onClick={() => setOpen(true)}>
                New Device
              </Button>
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
        <Header height={60} bg="#1A2F48">
          <Flex
            justify="center"
            align="center"
            style={{ width: '100%', height: '100%', paddingLeft: 250 }}
          >
            <Link to="/">
              <Image
                width={180}
                radius="md"
                src={logo}
                onClick={() => {
                  setSelectedDevice(null);
                }}
              />
            </Link>
          </Flex>
        </Header>
      }
    >
      {children}
      <CreateDeviceModal onClose={handleClose} opened={open} />
    </AppShell>
  );
};
