import { Card, Progress, Stack, Text } from '@mantine/core';

export const SelectedDevice = ({
  totalVolume,
  percentage,
  volume,
}: {
  totalVolume: string;
  percentage: number;
  volume: string;
}) => {
  return (
    <Card withBorder radius="md" padding="xl" style={{ width: 400 }}>
      <Stack align="center">
        <Text fz="sm" tt="uppercase" fw={700} c="dimmed">
          Nivel de água
        </Text>
        <Text fz="xl" fw={500}>
          {volume} / {totalVolume}
        </Text>
      </Stack>
      <Progress value={percentage} mt="md" size="lg" radius="xl" />
    </Card>
  );
};
