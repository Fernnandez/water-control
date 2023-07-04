#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>

/********** WiFi Credentials **********/
const char* ssid = "Davifurao";
const char* password = "12345678";

/********** MQTT Broker Credentials **********/
const char* mqtt_server = "f9ca89e3f5df46e6a4b2e122b2d56a3c.s2.eu.hivemq.cloud"; // public MQTT broker
const char* mqtt_username = "username";
const char* mqtt_password = "@MQTT-password1";
const int mqtt_port = 8883;

/********** MQTT Topic **********/
const char* mqtt_topic = "111111111111";

/********** Variables **********/
int inicio_random = 0;  // valor aleatório inicial
int fim_random = 50;    // valor aleatório limite. Referente à amperagem
int time_sleep_pub = 1; // Referente à amperagem

/********** WiFiClientSecure Instance **********/
WiFiClientSecure espClient;

/********** PubSubClient Instance **********/
PubSubClient client(espClient);

/********** Custom Structure to Store Message Info **********/
struct MessageInfo {
  unsigned long publish_time;
};

/********** Callback Function for Message Delivery **********/
void onMessageDelivery(char* topic, byte* payload, unsigned int length) {
  // Obtém a instância da estrutura MessageInfo a partir do payload
  struct MessageInfo* message_info = (struct MessageInfo*)payload;

  // Obtém o tempo atual
  unsigned long delivery_time = millis();

  // Calcula a duração da entrega
  unsigned long delivery_duration = delivery_time - message_info->publish_time;

  Serial.print("Message delivered. Delivery duration: ");
  Serial.print(delivery_duration);
  Serial.println(" ms");
}

/********** Function to connect to WiFi **********/
void connectToWiFi() {
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

/********** Function to connect to MQTT Broker **********/
void connectToMQTTBroker() {
  Serial.print("Connecting to MQTT Broker...");

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(onMessageDelivery);

  while (!client.connected()) {
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds...");
      delay(5000);
    }
  }
}

/********** Function to publish message **********/
void publishMessage() {
  int msg = random(inicio_random, fim_random);

  Serial.print("Publishing message: ");
  Serial.println(msg);

  // Armazena a hora de publicação
  unsigned long publish_time = millis();

  // Cria uma instância da estrutura MessageInfo
  struct MessageInfo message_info;
  message_info.publish_time = publish_time;

  // Publica a mensagem e passa a estrutura como argumento adicional
  client.publish(mqtt_topic, (const uint8_t*)&msg, sizeof(int), true);
}

/********** Setup Function **********/
void setup() {
  Serial.begin(115200);

  connectToWiFi();

    /*
  #ifdef ESP8266
    espClient.setInsecure();
  #else
    espClient.setCACert(root_ca);      // enable this line and the the "certificate" code for secure connection
  #endif
    */


  // Configuração do certificado raiz
  const char* root_ca =
    "-----BEGIN CERTIFICATE-----\n"
    "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\n"
    "-----END CERTIFICATE-----\n";

  espClient.setCACert(root_ca);

  connectToMQTTBroker();
}

/********** Loop Function **********/
void loop() {
  if (!client.connected()) {
    connectToMQTTBroker();
  }

  client.loop();
  publishMessage();
  delay(time_sleep_pub * 1000); // Aguarda antes de publicar a próxima mensagem
}
