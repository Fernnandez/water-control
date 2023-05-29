import mqtt from 'mqtt';
import { DateTime } from 'luxon';
import { devices } from './devices.js';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  const deviceMap = {}; // Armazena o último valor de volume e bateria para cada dispositivo
  let timestamp = DateTime.fromISO('2023-01-01').toMillis(); // Definindo o timestamp inicial para janeiro de 2023
  const now = DateTime.now().toMillis(); // Obtendo o timestamp atual

  const intervalId = setInterval(() => {
    if (timestamp > now) {
      // Verifica se o timestamp atual ultrapassou o timestamp atual
      clearInterval(intervalId); // Interrompe a execução do setInterval
      return;
    }

    devices.forEach((device) => {
      // Simulação da alteração do volume do reservatório
      const previousVolume =
        deviceMap[device.macAddress]?.volume ?? device.volumeTotal; // valor anterior ou valor total
      const diff = Math.floor(Math.random() * 310) - 250; // gera número aleatório entre -10 e 10
      const currentVolume = Math.max(
        0,
        Math.min(device.volumeTotal, previousVolume + diff)
      ); // limita o valor dentro do intervalo [0, volumeTotal]

      const percentage = ((currentVolume / device.volumeTotal) * 100).toFixed(
        2
      );

      // Simulação da alteração da bateria
      const previousBattery = deviceMap[device.macAddress]?.battery ?? 100; // valor anterior ou 100%
      const currentBattery = Math.max(0, previousBattery - 1); // decrementa a bateria em 1%
      const isBatteryDead = currentBattery <= 0;

      if (!isBatteryDead) {
        // Criação da mensagem MQTT
        const message = {
          volume: currentVolume,
          percentage,
          battery: currentBattery,
          timestamp,
        };

        console.log(message);
        client.publish(device.macAddress, JSON.stringify(message));
      }

      // Armazenamento do valor atual para uso no próximo intervalo
      deviceMap[device.macAddress] = {
        volume: currentVolume,
        battery: currentBattery,
      };
      const day = 3600000 * 24;
      timestamp += day;
    });
  }, 0.5 * 1000);
});
