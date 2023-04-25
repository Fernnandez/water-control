import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../entity/device.entity';
import { DeviceHistory } from '../entity/deviceHistory.entity';

@Injectable()
export class DeviceHistoryService {
  constructor(
    @InjectRepository(DeviceHistory)
    private deviceHisotryRepository: Repository<DeviceHistory>,
  ) {}

  async create(dto: {
    volume: number;
    percentage: number;
    timestamp: Date;
    device: Device;
  }): Promise<DeviceHistory> {
    console.log(Number(dto.volume / dto.device.maxCapacity));
    return await this.deviceHisotryRepository.save({
      volume: dto.volume,
      percentage: dto.percentage,
      timestamp: dto.timestamp,
      device: dto.device,
    });
  }
}
