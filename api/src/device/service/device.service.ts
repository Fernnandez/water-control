import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttService } from '../../mqtt/mqtt.service';
import { CreateDeviceDTO } from '../controller/device.controller';
import { Device } from '../entity/device.entity';
import { DeviceHistoryService } from './device-history.service';

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
        console.log(`Subscribing to ${device.mac}`);
        this.mqttService.subscribe(device.mac, (msg) => {
          const dto = JSON.parse(msg);
          this.deviceHistoryService.create({
            volume: dto.volume,
            battery: dto.battery,
            timestamp: new Date(dto.timestamp),
            device,
          });
          this.deviceRepository.update(device.id, {
            percentage: Number(dto.percentage),
            battery: dto.battery,
            water: dto.volume,
          });
        });
      }),
    );
  }

  async create(dto: CreateDeviceDTO): Promise<Device> {
    const deviceAlreadyExists = await this.findByMac(dto.mac);

    if (deviceAlreadyExists) {
      throw new ConflictException('Device already exists');
    }

    return await this.deviceRepository.save({ ...dto });
  }

  async findByMac(mac: string): Promise<Device> {
    return await this.deviceRepository.findOne({ where: { mac } });
  }

  findAll(): Promise<Device[]> {
    return this.deviceRepository.find({ relations: ['devicesHistory'] });
  }

  findOne(id: string): Promise<Device> {
    return this.deviceRepository.findOne({
      where: { id },
      relations: ['devicesHistory'],
    });
  }
}
