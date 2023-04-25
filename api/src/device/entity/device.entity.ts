import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceHistory } from './deviceHistory.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mac: string;

  @Column()
  name: string;

  @Column()
  topic: string;

  @Column()
  maxCapacity: number;

  @OneToMany(() => DeviceHistory, (devicesHistory) => devicesHistory.device)
  devicesHistory: DeviceHistory[];
}
