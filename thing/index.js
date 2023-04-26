// import mqtt from 'mqtt';
// import { devices } from './devices';

// const client = mqtt.connect('mqtt://localhost:1883');

// let count = 1;
// let timestamp = 3600000;

// client.on('connect', () => {
//   console.log('conectado ao broker');
//   setInterval(() => {
//     const message = {
//       volume: count * 100,
//       percentage: count * 10,
//       timestamp: Date.now() + timestamp,
//     };
//     client.publish('127.123.0.1-casa', JSON.stringify(message));
//     count++;
//     timestamp += 3600000;
//   }, 10 * 1000);
// });

// client.on('error', (error) => {
//   console.log(error);
// });

// import mqtt from 'mqtt';
// import { devices } from './devices.js';

// const client = mqtt.connect('mqtt://localhost:1883');

// client.on('connect', () => {
//   console.log('Conectado ao broker MQTT');
//   const volumeMap = {}; // Armazena o último valor de volume para cada dispositivo
//   setInterval(() => {
//     devices.forEach((device) => {
//       console.log(device);
//       // Simulação da alteração do volume do reservatório
//       const previousVolume = volumeMap[device.mac] ?? device.volumeTotal; // valor anterior ou valor total
//       const diff = Math.floor(Math.random() * 21) - 10; // gera número aleatório entre -10 e 10
//       const currentVolume = Math.max(
//         0,
//         Math.min(device.volumeTotal, previousVolume + diff)
//       ); // limita o valor dentro do intervalo [0, volumeTotal]
//       const percentage = Math.floor((currentVolume / device.volumeTotal) * 100);

//       // Criação da mensagem MQTT
//       const message = {
//         volume: currentVolume,
//         percentage,
//         timestamp: Date.now(),
//       };

//       // Publicação da mensagem MQTT no tópico do dispositivo
//       // const topic = `devices/${device.macAddress}`;
//       client.publish(device.mac, JSON.stringify(message));

//       // Armazenamento do valor atual para uso no próximo intervalo
//       volumeMap[device.mac] = currentVolume;
//       timestamp += 3600000;
//     });
//   }, 10 * 1000);
// });

// client.on('error', (error) => {
//   console.log(`Erro na conexão MQTT: ${error}`);
// });

import mqtt from 'mqtt';
import { devices } from './devices.js';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  const deviceMap = {}; // Armazena o último valor de volume e bateria para cada dispositivo
  let timestamp = 3600000;
  setInterval(() => {
    devices.forEach((device) => {
      // Simulação da alteração do volume do reservatório
      const previousVolume =
        deviceMap[device.macAddress]?.volume ?? device.volumeTotal; // valor anterior ou valor total
      const diff = Math.floor(Math.random() * 31) - 25; // gera número aleatório entre -10 e 10
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
          timestamp: Date.now() + timestamp,
        };

        // Publicação da mensagem MQTT no tópico do dispositivo
        // const topic = `devices/${device.macAddress}`;
        console.log(message);
        client.publish(device.macAddress, JSON.stringify(message));
      }

      // Armazenamento do valor atual para uso no próximo intervalo
      deviceMap[device.macAddress] = {
        volume: currentVolume,
        battery: currentBattery,
      };
      timestamp += 3600000;
    });
  }, 60 * 1000);
});

client.on('error', (error) => {
  console.log(`Erro na conexão MQTT: ${error}`);
});
