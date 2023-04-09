import { MqttService } from './../mqtt/mqtt.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private readonly mqttService: MqttService,
  ) {
    this.mqttService.subscribe('casa-1', (msg) => {
      console.log(`Received message: ${msg}`);
    });
    this.mqttService.subscribe('casa-2', (msg) => {
      console.log(`Received message: ${msg}`);
    });
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
