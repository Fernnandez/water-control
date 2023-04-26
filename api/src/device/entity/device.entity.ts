import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceHistory } from './device-history.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mac: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  battery: number;

  @Column({ default: 0 })
  water: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  percentage: number;

  @Column({ default: 0 })
  maxWater: number;

  @OneToMany(() => DeviceHistory, (devicesHistory) => devicesHistory.device)
  devicesHistory: DeviceHistory[];
}
