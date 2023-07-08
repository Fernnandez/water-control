#include <WiFi.h>
#include <PubSubClient.h>

/********** WiFi Credentials **********/
const char* ssid = "Davifurao";
const char* password = "12345678";

/********** MQTT Broker Credentials **********/
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;

/********** MQTT Topic **********/
const char* mqtt_topic = "111111111111";

/********** Variables **********/
int inicio_random = 0;  // valor aleatório inicial
int fim_random = 50;    // valor aleatório limite. Referente à amperagem
int time_sleep_pub = 1; // Referente à amperagem

/********** WiFiClient Instance **********/
WiFiClient espClient;

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

  while (!client.connected()) {
    if (client.connect("ESP32Client")) {
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
  client.publish(mqtt_topic, String(msg).c_str(), sizeof(struct MessageInfo), (void*)&message_info);
}

/********** Setup Function **********/
void setup() {
  Serial.begin(115200);

  connectToWiFi();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(onMessageDelivery);

  connectToMQTTBroker();
}

/********** Loop Function **********/
void loop() {
  if (!client.connected()) {
    connectToMQTTBroker();
  }

  client.loop();

  publishMessage();

  delay(time_sleep_pub * 1000);
}
