import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

let count = 1;

client.on('connect', () => {
  console.log('conectado ao broker');
  setInterval(() => {
    const message = { volume: count };

    client.publish('127.123.0.1-casa', JSON.stringify(message));
    count++;
  }, 60 * 1000);
});

client.on('error', (error) => {
  console.log(error);
});
