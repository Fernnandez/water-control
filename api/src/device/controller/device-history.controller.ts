// device-history.controller.ts
import { Body, Controller, Param, Post } from '@nestjs/common';
import { DeviceHistory } from '../entity/device-history.entity';
import { DeviceHistoryService } from '../service/device-history.service';
import { DeviceService } from '../service/device.service';
import { DeviceHistoryDto } from './device-history.dto';

@Controller('device-history')
export class DeviceHistoryController {
  constructor(
    private readonly deviceHistoryService: DeviceHistoryService,
    private readonly deviceService: DeviceService,
  ) {}

  @Post()
  async create(
    @Param('mac') mac: string,
    @Body() deviceHistory: DeviceHistoryDto,
  ): Promise<DeviceHistory> {
    const { battery, timestamp, water } = deviceHistory;
    const device = await this.deviceService.findByMac(mac);

    return this.deviceHistoryService.create({
      water,
      battery,
      timestamp,
      device,
    });
  }
}
