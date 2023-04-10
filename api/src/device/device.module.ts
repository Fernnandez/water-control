import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../mqtt/mqtt.module';
import { DeviceController } from './device.controller';
import { Device } from './device.entity';
import { DeviceService } from './device.service';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), MqttModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
