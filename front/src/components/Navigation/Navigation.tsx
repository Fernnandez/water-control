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

const history = [
  {
    date: '01/04/23',
    volume: 1500,
    battery: 100,
  },
  {
    date: '02/04/23',
    volume: 1520,
    battery: 99,
  },
  {
    date: '03/04/23',
    volume: 1495,
    battery: 98,
  },
  {
    date: '04/04/23',
    volume: 1480,
    battery: 97,
  },
  {
    date: '04/04/23',
    volume: 1460,
    battery: 96,
  },
  {
    date: '06/04/23',
    volume: 1445,
    battery: 95,
  },
  {
    date: '07/04/23',
    volume: 1420,
    battery: 94,
  },
  {
    date: '08/04/23',
    volume: 1404,
    battery: 93,
  },
  {
    date: '09/04/23',
    volume: 1420,
    battery: 92,
  },
  {
    date: '10/04/23',
    volume: 1440,
    battery: 91,
  },
  {
    date: '11/04/23',
    volume: 1465,
    battery: 90,
  },
  {
    date: '12/04/23',
    volume: 1450,
    battery: 89,
  },
  {
    date: '13/04/23',
    volume: 1425,
    battery: 88,
  },
  {
    date: '14/04/23',
    volume: 1404,
    battery: 87,
  },
  {
    date: '15/04/23',
    volume: 1390,
    battery: 86,
  },
  {
    date: '16/04/23',
    volume: 1370,
    battery: 85,
  },
  {
    date: '17/04/23',
    volume: 1385,
    battery: 84,
  },
  {
    date: '18/04/23',
    volume: 1365,
    battery: 83,
  },
  {
    date: '19/04/23',
    volume: 1350,
    battery: 82,
  },
  {
    date: '20/04/23',
    volume: 1370,
    battery: 81,
  },
  {
    date: '21/04/23',
    volume: 1350,
    battery: 80,
  },
  {
    date: '22/04/23',
    volume: 1330,
    battery: 79,
  },
  {
    date: '23/04/23',
    volume: 1310,
    battery: 78,
  },
  {
    date: '24/04/23',
    volume: 1300,
    battery: 77,
  },
  {
    date: '25/04/23',
    volume: 1320,
    battery: 76,
  },
  {
    date: '26/04/23',
    volume: 1304,
    battery: 75,
  },
  {
    date: '27/04/23',
    volume: 1285,
    battery: 74,
  },
  {
    date: '28/04/23',
    volume: 1270,
    battery: 73,
  },
  {
    date: '29/04/23',
    volume: 1255,
    battery: 72,
  },
  {
    date: '30/04/23',
    volume: 1240,
    battery: 71,
  },
  {
    date: '01/05/23',
    volume: 1500,
    battery: 100,
  },
  {
    date: '02/05/23',
    volume: 1520,
    battery: 99,
  },
  {
    date: '03/05/23',
    volume: 1495,
    battery: 98,
  },
  {
    date: '04/05/23',
    volume: 1480,
    battery: 97,
  },
  {
    date: '05/05/23',
    volume: 1460,
    battery: 96,
  },
  {
    date: '06/05/23',
    volume: 1445,
    battery: 95,
  },
  {
    date: '07/05/23',
    volume: 1420,
    battery: 94,
  },
  {
    date: '08/05/23',
    volume: 1405,
    battery: 93,
  },
  {
    date: '09/05/23',
    volume: 1420,
    battery: 92,
  },
  {
    date: '10/05/23',
    volume: 1440,
    battery: 91,
  },
  {
    date: '11/05/23',
    volume: 1465,
    battery: 90,
  },
  {
    date: '12/05/23',
    volume: 1450,
    battery: 89,
  },
  {
    date: '13/05/23',
    volume: 1425,
    battery: 88,
  },
  {
    date: '14/05/23',
    volume: 1405,
    battery: 87,
  },
  {
    date: '15/05/23',
    volume: 1390,
    battery: 86,
  },
  {
    date: '16/05/23',
    volume: 1370,
    battery: 85,
  },
  {
    date: '17/05/23',
    volume: 1385,
    battery: 84,
  },
  {
    date: '18/05/23',
    volume: 1365,
    battery: 83,
  },
  {
    date: '19/05/23',
    volume: 1350,
    battery: 82,
  },
  {
    date: '20/05/23',
    volume: 1370,
    battery: 81,
  },
  {
    date: '21/05/23',
    volume: 1350,
    battery: 80,
  },
  {
    date: '22/05/23',
    volume: 1330,
    battery: 79,
  },
  {
    date: '23/05/23',
    volume: 1310,
    battery: 78,
  },
  {
    date: '24/05/23',
    volume: 1300,
    battery: 77,
  },
  {
    date: '25/05/23',
    volume: 1320,
    battery: 76,
  },
  {
    date: '26/05/23',
    volume: 1305,
    battery: 75,
  },
  {
    date: '27/05/23',
    volume: 1285,
    battery: 74,
  },
  {
    date: '28/05/23',
    volume: 1270,
    battery: 73,
  },
  {
    date: '29/05/23',
    volume: 1255,
    battery: 72,
  },
  {
    date: '30/05/23',
    volume: 1240,
    battery: 71,
  },
];

export const Navigation = ({ children }: NavigationProps) => {
  const { setDevices } = useContext(AppContext);
  const { getAll } = useDevice();
  const devicesQuery = useQuery(['allDevices'], getAll, {
    refetchInterval: 10 * 1000,
    onSuccess: (data) => {
      const newData = data.map((device: IDevice) => {
        return {
          ...device,
          history,
          minDate: DateTime.fromFormat(history[0].date, 'dd/MM/yy').toJSDate(),
          maxDate: DateTime.fromFormat(
            history[history.length - 1].date,
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
          width={{ base: 250 }}
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
