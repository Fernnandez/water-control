#include <PubSubClient.h>
#include <WiFi.h>

const char* ssid = "Davifurao";
const char* password = "12345678";
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;
const char* mqttTopic = "teste123";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long publishTime = 0;//tempo inicial de publicação

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("Conectado ao WiFi.");

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);//cria um callback(o parametro dele é uma funcao)

  while (!client.connected()) {
    if (client.connect("arduino-client")) {
      Serial.println("Conectado ao broker MQTT.");
    } else {
      Serial.print("Falha na conexão ao broker MQTT. Código de erro: ");
      Serial.println(client.state());
      delay(2000);
    }
  }

  publishMessage("Minha mensagem");
}

void loop() {
  client.loop();
}

void callback(char* topic, byte* payload, unsigned int length) {
  unsigned long arrivalTime = millis();//conta o tempo atual
  Serial.print("Mensagem recebida do tópico: ");
  Serial.println(topic);
  Serial.print("Hora de chegada no broker: ");
  Serial.println(arrivalTime);

  unsigned long deliveryTime = arrivalTime - publishTime;//tempo de viagem(que é chamada na função publishMessage)
  Serial.print("Tempo de entrega: ");
  Serial.println(deliveryTime);
}

void publishMessage(const char* message) {
  publishTime = millis();
  client.publish(mqttTopic, message);
  Serial.print("Mensagem publicada. Hora do envio: ");
  Serial.println(publishTime);
}


/*
É esperado com esse código o calculo do tempo de viagem da mensagem entre o dispositivo que vai publicar a mensaem e o broker.

Como a medição é feita:

É calculado o momento em que a mensagem é publicada e guardado na variavel publishTime

Logo depois é iniciado a função de callback(quando a mesma já foi publicada), e calcula-se o tempo do ack(quando a mensagem chega no broker)

Somente então é calculado a diferença entre os dois(sabendo assim o tempo de viagem)
*/
