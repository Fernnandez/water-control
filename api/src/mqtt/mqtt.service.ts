import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.Client;

  constructor() {
    this.client = mqtt.connect('mqtt://localhost:1883');
  }

  subscribe(topic: string, callback: (message: string) => void) {
    this.client.subscribe(topic);
    this.client.on('message', (t, message) => {
      if (t === topic) {
        callback(message.toString());
      }
    });
  }

  unsubscribe(topic: string) {
    this.client.unsubscribe(topic);
  }
}
