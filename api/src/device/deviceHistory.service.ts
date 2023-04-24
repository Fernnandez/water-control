import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { DeviceHistory } from './deviceHistory.entity';

@Injectable()
export class DeviceHistoryService {
  constructor(
    @InjectRepository(DeviceHistory)
    private deviceHisotryRepository: Repository<DeviceHistory>,
  ) {}

  async create(dto: {
    volume: number;
    timestamp: Date;
    device: Device;
  }): Promise<DeviceHistory> {
    console.log(dto);
    return await this.deviceHisotryRepository.save({
      volume: dto.volume,
      timestamp: dto.timestamp,
      device: dto.device,
    });
  }
}
