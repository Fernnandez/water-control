import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttService } from './../mqtt/mqtt.service';
import { Device } from './device.entity';
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
          // TODO - Update device's History
          this.deviceHistoryService.create({
            volume: JSON.parse(msg).volume,
            timestamp: new Date(),
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

  async findByName(name: string): Promise<Device> {
    return await this.deviceRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }
}
