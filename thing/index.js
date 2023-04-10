import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('conectado ao broker');
  getVolume();
});

client.on('error', (error) => {
  console.log(error);
});

const getVolume = () => {
  for (let index = 0; index <= 10; index++) {
    const message = { volume: index + 10 };
    client.publish('casa', JSON.stringify(message));
  }
};
