import { Box, Text } from '@mantine/core';

function BatteryGauge({ value = 0 }) {
  return (
    <Box
      style={{
        border: '10px solid green',
        width: 100,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          width: '99%',
          height: '99%',
          background: `linear-gradient(to top, green, #ccc ${value}%, #fff ${value}%, #fff)`,
          backgroundPosition: '0% 50%',
          backgroundSize: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text fz={30}>{value}%</Text>
      </Box>
    </Box>
  );
}

export default BatteryGauge;
