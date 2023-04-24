import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../mqtt/mqtt.module';
import { DeviceController } from './device.controller';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { DeviceHistory } from './deviceHistory.entity';
import { DeviceHistoryService } from './deviceHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceHistory]), MqttModule],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceHistoryService],
})
export class DeviceModule {}
