import { Button, Center, Flex, Group } from '@mantine/core';
import { DeviceCard } from './components/DeviceCard/DeviceCard';
import { Navigation } from './components/Navigation/Navigation';
import { SelectedDevice } from './components/SelectedDevice/SelectedDevice';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

function App() {
  return (
    <Navigation>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        style={{ height: '100%' }}
      >
        <Group position="center" style={{ height: 300 }}>
          <DeviceCard active={true} name="Casa" />
          <DeviceCard active={false} name="Casa2" />
          <DeviceCard active={false} name="Fazenda" />
          <DeviceCard active={false} name="Apartamento" />
        </Group>
        <Center style={{ flex: 1 }}>
          <SelectedDevice
            percentage={53.4}
            volume="5.340L"
            totalVolume="10.000L"
          />
        </Center>
      </Flex>
    </Navigation>
  );
}

export default App;
