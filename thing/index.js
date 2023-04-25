import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

let count = 1;
let timestamp = 3600000;

client.on('connect', () => {
  console.log('conectado ao broker');
  setInterval(() => {
    const message = {
      volume: count * 100,
      percentage: count * 10,
      timestamp: Date.now() + timestamp,
    };
    client.publish('127.123.0.1-casa', JSON.stringify(message));
    count++;
    timestamp += 3600000;
  }, 10 * 1000);
});

client.on('error', (error) => {
  console.log(error);
});
