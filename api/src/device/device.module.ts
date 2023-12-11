import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../mqtt/mqtt.module';
import { DeviceHistoryController } from './controller/device-history.controller';
import { DeviceController } from './controller/device.controller';
import { DeviceHistory } from './entity/device-history.entity';
import { Device } from './entity/device.entity';
import { DeviceHistoryService } from './service/device-history.service';
import { DeviceService } from './service/device.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceHistory]), MqttModule],
  controllers: [DeviceController, DeviceHistoryController],
  providers: [DeviceService, DeviceHistoryService],
})
export class DeviceModule {}
