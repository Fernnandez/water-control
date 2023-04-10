import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';
import { Device } from './device/device.entity';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'dev',
      password: 'dev_pass',
      database: 'water_db',
      entities: [Device],
      synchronize: true,
    }),
    DeviceModule,
    MqttModule,
  ],
})
export class AppModule {}
