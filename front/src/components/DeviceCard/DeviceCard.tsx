import { Divider, Image, Paper, Text } from '@mantine/core';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/casa.png';
import { AppContext } from '../../contexts/AppContext';

interface DeviceCardProps {
  uuid: string;
  name: string;
}

export const DeviceCard = ({ uuid, name }: DeviceCardProps) => {
  const context = useContext(AppContext);

  const active = context.selectedDevice?.id === uuid;

  return (
    <Paper
      component={Link}
      to={'/things/'.concat(uuid)}
      onClick={() => {
        const device = context.devices.find((device) => device.id === uuid);
        if (device) context.setSelectedDevice(device);
      }}
      sx={(theme) => ({
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '2px',
        alignItems: 'center',
        backgroundColor: 'white',
        wordBreak: 'break-word',
        padding: '20px',
        color: active ? 'white' : '#1A2F48',
        background: active ? '#1A2F48' : theme.white,
        transition: '.5s',
        borderRadius: '8px',
        position: 'relative',
        mb: '10px',
        border: '.5px solid #1A2F48',
        '&:hover': {
          backgroundColor: active ? '#1A2F48' : '#4f6f80',
          borderColor: '#1A2F48',
          cursor: 'pointer',
          color: 'white',
        },
      })}
    >
      <Image maw={40} mx="auto" radius="md" src={img} alt="Random image" />
      <Divider my="xs" size="md" />
      <Text>{name}</Text>
    </Paper>
  );
};
