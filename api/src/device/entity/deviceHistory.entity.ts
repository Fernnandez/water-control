import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class DeviceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  volume: number;

  @Column()
  percentage: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Device, (device) => device.devicesHistory)
  device: Device;
}
