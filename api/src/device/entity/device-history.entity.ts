import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class DeviceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  battery: number;

  @Column()
  water: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Device, (device) => device.devicesHistory)
  device: Device;
}
