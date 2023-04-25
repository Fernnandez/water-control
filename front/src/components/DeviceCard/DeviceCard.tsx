import { ActionIcon, Card, Stack, Title, rem } from '@mantine/core';
import { GiWaterTower } from 'react-icons/gi';

interface DeviceCardProps {
  active: boolean;
  name: string;
  action: () => void;
}

export const DeviceCard = ({ active, name, action }: DeviceCardProps) => {
  return (
    <Card
      shadow="lg"
      p="xl"
      radius="md"
      onClick={action}
      sx={(theme) => ({
        width: rem(150),
        height: rem(150),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: active ? theme.colors.blue[5] : theme.colors.blue[2],
        ':hover': {
          border: '1px solid',
          borderColor: theme.colors.blue[5],
          cursor: 'pointer',
        },
      })}
    >
      <Stack align="center" style={{ width: '100%' }} spacing="xs">
        <ActionIcon size={64} color={'white'} variant="transparent">
          <GiWaterTower size={50} color="white" />
        </ActionIcon>
        <Title
          order={3}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
            color: theme.white,
            lineHeight: 1.2,
            fontSize: rem(20),
            marginTop: theme.spacing.xs,
          })}
        >
          {name}
        </Title>
      </Stack>
    </Card>
  );
};
