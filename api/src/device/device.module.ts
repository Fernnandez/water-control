import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../mqtt/mqtt.module';
import { DeviceController } from './controller/device.controller';
import { Device } from './entity/device.entity';
import { DeviceService } from './service/device.service';
import { DeviceHistory } from './entity/deviceHistory.entity';
import { DeviceHistoryService } from './service/deviceHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceHistory]), MqttModule],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceHistoryService],
})
export class DeviceModule {}
