import { Box, Text } from '@mantine/core';

function LiquidGauge({ value = 0 }) {
  return (
    <Box
      style={{
        border: '10px solid blue',
        borderRadius: 300,
        width: 300,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          width: '99%',
          height: '99%',
          borderRadius: 300,
          background: `linear-gradient(to top, blue, #ccc ${value}%, #fff ${value}%, #fff)`,
          backgroundPosition: '0% 50%',
          backgroundSize: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text fz={50}>{value}%</Text>
      </Box>
    </Box>
  );
}

export default LiquidGauge;
