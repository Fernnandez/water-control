import { Body, Controller, Get, Post } from '@nestjs/common';
import { Device } from '../entity/device.entity';
import { DeviceService } from '../service/device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Device> {
    return await this.deviceService.create(name);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.deviceService.findAll();
  }

  @Get('/history')
  async findAllWithHistory(): Promise<Device[]> {
    return await this.deviceService.findAllWithHistory();
  }
}
