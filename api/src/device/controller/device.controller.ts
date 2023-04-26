import { Body, Controller, Get, Post } from '@nestjs/common';
import { Device } from '../entity/device.entity';
import { DeviceService } from '../service/device.service';

export class CreateDeviceDTO {
  name: string;
  mac: string;
  maxWater: number;
}

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() dto: CreateDeviceDTO): Promise<Device> {
    return await this.deviceService.create(dto);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.deviceService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<Device> {
    return await this.deviceService.findOne(id);
  }
}
