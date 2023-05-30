import { Box, Text } from '@mantine/core';

function LiquidGauge({ value = 0 }) {
  return (
    <Box
      style={{
        border: '10px solid blue',
        borderRadius: 150,
        width: 150,
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
          borderRadius: 200,
          background: `linear-gradient(to top, blue, #ccc ${value}%, #fff ${value}%, #fff)`,
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

export default LiquidGauge;
