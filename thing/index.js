import mqtt from 'mqtt';
import { DateTime } from 'luxon';
import { devices } from './devices.js';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  const deviceMap = {}; // Armazena a última distância do sensor e nível de bateria para cada dispositivo
  let timestamp = DateTime.fromISO('2023-01-01').toMillis(); // Definindo o timestamp inicial para janeiro de 2023
  const now = DateTime.now().toMillis(); // Obtendo o timestamp atual

  const intervalId = setInterval(() => {
    if (timestamp > now) {
      // Verifica se o timestamp atual ultrapassou o timestamp atual
      clearInterval(intervalId); // Interrompe a execução do setInterval
      return;
    }

    devices.forEach((device) => {
      // Simulação da alteração da distância do sensor
      const previousDistance = deviceMap[device.macAddress]?.distance ?? 0; // Valor anterior ou 0 (inicial)
      const diffDistance = Math.floor(Math.random() * 30) - 10; // Gera número aleatório entre -100 e 100
      const currentDistance = Math.max(
        0,
        Math.min(device.heigth, previousDistance + diffDistance)
      ); // Garante que a distância seja sempre não negativa

      // Simulação da diminuição da bateria
      const previousBattery = deviceMap[device.macAddress]?.battery ?? 100; // Valor anterior ou 100%
      const currentBattery = Math.max(0, previousBattery - 1); // Decrementa a bateria em 1%
      const isBatteryDead = currentBattery <= 0;

      // Criação da mensagem MQTT com a distância atual e nível de bateria
      const message = {
        distance: currentDistance,
        battery: currentBattery,
        timestamp,
      };

      client.publish(device.macAddress, JSON.stringify(message));

      // Armazenamento do valor atual para uso no próximo intervalo
      deviceMap[device.macAddress] = {
        distance: currentDistance,
        battery: isBatteryDead ? 0 : currentBattery, // Define o nível de bateria como 0 se estiver descarregada
      };

      const day = 3600000 * 24;
      timestamp += day;
    });
  }, 0.5 * 1000);
});
