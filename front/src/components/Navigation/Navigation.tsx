import { AppShell } from '@mantine/core';

interface NavigationProps {
  children?: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  return <AppShell>{children}</AppShell>;
};
