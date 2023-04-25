import {
  Center,
  Flex,
  Group,
  Loader,
  Progress,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { DeviceCard } from '../DeviceCard/DeviceCard';
import { SelectedDevice } from '../SelectedDevice/SelectedDevice';

export const Dashboard = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setProgress((progress) => progress + 10);
      if (counter === 10) {
        counter = 0;
        setProgress(0);
      }
    }, 1000);
  }, []);

  const { isLoading, data } = useQuery(
    'devices',
    () =>
      fetch('http://localhost:3000/devices/history').then((res) => res.json()),
    {
      refetchInterval: 10 * 1000,
    }
  );

  const handleSelectDevice = (mac: string) => {
    setSelectedDevice(mac);
  };

  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
      style={{ height: '100%' }}
    >
      <Text>Refetch Time</Text>
      <Progress
        value={progress}
        mt="md"
        size="lg"
        radius="xl"
        style={{ width: '100%' }}
      />
      <Group position="center" style={{ height: 300 }}>
        {isLoading && <Loader />}
        {data &&
          data.map((device: any) => (
            <DeviceCard
              key={device.mac}
              active={selectedDevice === device.mac}
              name={device.name}
              action={() => handleSelectDevice(device.mac)}
            />
          ))}
      </Group>
      <Center style={{ flex: 1 }}>
        {selectedDevice && data ? (
          <SelectedDevice
            volume={data.find((el: any) => el.mac === selectedDevice).volume}
            totalVolume={
              data.find((el: any) => el.mac === selectedDevice).totalVolume
            }
            percentage={
              data.find((el: any) => el.mac === selectedDevice).percentage
            }
          />
        ) : (
          <Title>Selecione um dispositivo</Title>
        )}
      </Center>
    </Flex>
  );
};
