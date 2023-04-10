import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Device } from './device.entity';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Device> {
    return await this.deviceService.create(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Device> {
    return await this.deviceService.findOne(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Device> {
    return await this.deviceService.findByName(name);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.deviceService.findAll();
  }
}
