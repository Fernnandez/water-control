import { Global } from '@mantine/core';

export function GlobalOverride() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          scrollbarGutter: 'stable',
          '::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: theme.colors.gray[0],
          },

          '::-webkit-scrollbar-thumb': {
            background: theme.colors.blue[6],
          },

          '::-webkit-scrollbar-track': {
            background: ' #C9C9C9',
            borderRadius: '10px',
          },
        },
      })}
    />
  );
}
