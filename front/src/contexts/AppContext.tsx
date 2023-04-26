import { ReactNode, createContext, useState } from 'react';

export interface IDevice {
  id: string;
  name: string;
  mac: string;
  battery: number;
  water: number;
  percentage: number;
  maxWater: number;
}
export type AppProviderType = {
  devices: IDevice[];
  setDevices: (devices: IDevice[]) => void;
  selectedDevice: IDevice | null;
  setSelectedDevice: (device: IDevice | null) => void;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);

  return (
    <AppContext.Provider
      value={{ devices, setDevices, selectedDevice, setSelectedDevice }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext<AppProviderType>({} as AppProviderType);
