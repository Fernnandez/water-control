import { Divider, Flex, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import BatteryGauge from '../Battery/Battery';
import LiquidGauge from '../Liquid/Liquid';

export const Dashboard = () => {
  const { id } = useParams();
  const context = useContext(AppContext);

  useEffect(() => {
    if (context.devices.length) {
      const selected = context.devices.find((element) => element.id === id);

      if (selected) context.setSelectedDevice(selected);
    }
  }, [id, context.devices]);

  return (
    <Flex
      mih={50}
      gap="md"
      align="center"
      direction="column"
      wrap="wrap"
      style={{ height: '100%' }}
    >
      <Title order={3}>Selected Device - {context.selectedDevice?.name}</Title>
      <Divider size="sm" style={{ width: '100%' }} />
      <Grid justify="space-between" style={{ width: '100%' }}>
        <Grid.Col span={6}>
          <Stack align="center">
            <Title>Current Consumption</Title>
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack align="center">
            <Title>History Consumption</Title>
            <Text>TODO feature</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Flex>
  );
};
