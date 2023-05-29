import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttService } from '../../mqtt/mqtt.service';
import { CreateDeviceDTO } from '../controller/device.controller';
import { Device } from '../entity/device.entity';
import { DeviceHistoryService } from './device-history.service';
import { DateTime } from 'luxon';
import { DeviceHistory } from '../entity/device-history.entity';

interface AggregatedDeviceHistory {
  date: string;
  volume: number;
  battery: number;
}

interface DeviceWithAggregatedHistory extends Device {
  aggregatedHistory: AggregatedDeviceHistory[];
}

// Função auxiliar para formatar a data no formato 'DD/MM/YY'
function formatDate(dateString: string): string {
  const date = DateTime.fromISO(dateString);
  return date.toFormat('dd/LL/yy');
}

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private readonly mqttService: MqttService,
    private readonly deviceHistoryService: DeviceHistoryService,
  ) {
    // TODO - Subscribe to MQTT topic of each one devices
    this.findAll().then((res) =>
      res.forEach((device) => {
        this.subscribe(device);
      }),
    );
  }

  async create(dto: CreateDeviceDTO): Promise<Device> {
    const deviceAlreadyExists = await this.findByMac(dto.mac);

    if (deviceAlreadyExists) {
      throw new ConflictException('Device already exists');
    }

    const newDevice = await this.deviceRepository.save({ ...dto });

    this.subscribe(newDevice);

    return newDevice;
  }

  async findByMac(mac: string): Promise<Device> {
    return await this.deviceRepository.findOne({ where: { mac } });
  }

  async findAll(): Promise<Device[]> {
    const devices = await this.deviceRepository
      .createQueryBuilder('device')
      .leftJoinAndSelect('device.devicesHistory', 'history')
      .orderBy('history.timestamp', 'ASC')
      .getMany();

    return devices.map((device) => this.mapDeviceToAggregatedHistory(device));
  }

  findOne(id: string): Promise<Device> {
    return this.deviceRepository.findOne({
      where: { id },
      relations: ['devicesHistory'],
    });
  }

  mapDeviceToAggregatedHistory(device: Device): DeviceWithAggregatedHistory {
    const aggregatedHistory: AggregatedDeviceHistory[] = [];

    // Agrupa o histórico por dia
    const groupedHistory = device.devicesHistory.reduce((acc, history) => {
      const date = DateTime.fromJSDate(history.timestamp).toISODate(); // Obtém a data em formato 'YYYY-MM-DD'
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(history);
      return acc;
    }, {} as { [date: string]: DeviceHistory[] });

    // Calcula o volume máximo de água e nível de bateria por dia
    for (const date in groupedHistory) {
      const historyList = groupedHistory[date];

      aggregatedHistory.push({
        date: formatDate(date),
        volume: historyList[historyList.length - 1].water,
        battery: historyList[historyList.length - 1].battery,
      });
    }

    const deviceWithAggregatedHistory: DeviceWithAggregatedHistory = {
      ...device,
      aggregatedHistory,
    };

    return deviceWithAggregatedHistory;
  }

  subscribe(device: Device): void {
    console.log(`Subscribing to ${device.mac}`);
    this.mqttService.subscribe(device.mac, (msg) => {
      const dto = JSON.parse(msg);
      this.deviceHistoryService.create({
        volume: dto.volume,
        battery: dto.battery,
        timestamp: new Date(dto.timestamp),
        device,
      });
      this.deviceRepository.update(device.id, {
        percentage: Number(dto.percentage),
        battery: dto.battery,
        water: dto.volume,
      });
    });
  }
}
