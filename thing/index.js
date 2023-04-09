import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('conectado ao broker');
  setInterval(() => {
    client.publish('casa-1', 'Hello, MQTT!');
    client.publish('casa-2', 'Hello, MQTT!');
  }, 5000);
});

client.on('error', (error) => {
  console.log(error);
});
