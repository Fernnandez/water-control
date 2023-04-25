import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttService } from '../../mqtt/mqtt.service';
import { Device } from '../entity/device.entity';
import { DeviceHistoryService } from './deviceHistory.service';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private readonly mqttService: MqttService,
    private readonly deviceHistoryService: DeviceHistoryService,
  ) {
    // TODO - Subscribe to MQTT topic of each one devices
    this.findAll().then((res) =>
      res.forEach((device) => {
        console.log(`Subscribing to ${device.topic}`);
        this.mqttService.subscribe(device.topic, (msg) => {
          console.log(msg);
          const dto = JSON.parse(msg);
          this.deviceHistoryService.create({
            volume: dto.volume,
            percentage: dto.percentage,
            timestamp: new Date(dto.timestamp),
            device,
          });
        });
      }),
    );
  }

  async create(name: string): Promise<Device> {
    return await this.deviceRepository.save({ name });
  }

  async findOne(id: string): Promise<Device> {
    return await this.deviceRepository.findOne({ where: { id } });
  }

  async findAllWithHistory() {
    const devices = await this.deviceRepository.find({
      relations: ['devicesHistory'],
    });

    return devices.map((device) => {
      return {
        ...device,
        volume:
          device?.devicesHistory[device?.devicesHistory?.length - 1]?.volume ||
          0,
        totalVolume: device.maxCapacity,
        percentage:
          device?.devicesHistory[device?.devicesHistory?.length - 1]
            ?.percentage || 0,
      };
    });
  }

  async findByName(name: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: { name },
    });
  }

  findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }
}
