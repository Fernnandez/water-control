import { Device } from './../device/entity/device.entity';
import { Injectable } from '@nestjs/common';
import { DeviceService } from '../device/service/device.service';
@Injectable()
export class ManangingSystemService {
  constructor(private readonly deviceService: DeviceService) {}

  async monitor(mac: string) {
    console.log('monitorando', mac);
    const device = await this.deviceService.findByMac(mac);

    return this.analiser(device);
  }

  async analiser(device: Device) {
    if (device.percentage > 50) {
      return this.planner(36000 * 1000);
    }

    if (device.percentage < 50 && device.percentage > 25) {
      // definir valor de sleep
      return this.planner(10000);
    }

    if (device.percentage < 25) {
      // definir valor de sleep
      return this.planner(20000);
    }
  }

  async planner(value: null | number) {
    return { deepSleep: value };
  }
}
