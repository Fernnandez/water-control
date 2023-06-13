#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <PubSubClient.h>

/********** WiFi Connection Details **********/
const char* ssid = "DTEL_ALBERES_2.4";
const char* password = "#MFDO1983@";

/********** MQTT Broker Connection Details **********/
const char* mqttServer = "broker.hivemq.com"; // public MQTT broker
const char* mqtt_username = "your_mqtt_client_username";
const char* mqtt_password = "your_mqtt_client_password";
const int mqttPort = 1883;

/********** NTP Client Setup **********/
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

/********** MQTT Client Setup **********/
WiFiClient espClient;
PubSubClient client(espClient);

/********** Global State Variables **********/
const int updateInterval = 30000; // Intervalo de atualização em milissegundos
int previousDistance = 0;
int previousBattery = 100;

struct Device {
  String macAddress;
  int height;
};

Device device = {
  "00:1B:44:11:3A:B7",
  200,
};

/************* Connect to WiFi ***********/
void setupWiFi() {
  delay(10);
  Serial.print("\nConnecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected\nIP address: ");
  Serial.println(WiFi.localIP());
}

/************* Connect to MQTT Broker ***********/
void setupMQTT() {
  client.setServer(mqttServer, mqttPort);

  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";   // Create a random client ID
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
  
  setupWiFi();
  setupMQTT();
  
  timeClient.begin();
  timeClient.setTimeOffset(-10800); // Ajuste de fuso horário (em segundos)
}

void loop() {
  timeClient.update();
  
  unsigned long timestamp = timeClient.getEpochTime();

  digitalWrite(LED_BUILTIN, LOW); // Liga o LED

  // Simulação da alteração da distância do sensor
  int diffDistance = random(-10, 11);
  int currentDistance = constrain(previousDistance + diffDistance, 0, device.height);

  // Simulação da diminuição da bateria
  int currentBattery = max(previousBattery - 1, 0);

  // Criação da mensagem MQTT com a distância atual e nível de bateria
  String macAddress = device.macAddress;
  String message = "{\"distance\": " + String(currentDistance) + ", \"battery\": " + String(currentBattery) + ", \"timestamp\": " + String(timestamp) + "}";

  Serial.print("Enviando mensagem para o tópico: ");
  Serial.println(macAddress);
  Serial.print("Mensagem: ");
  Serial.println(message);

  client.publish(macAddress.c_str(), message.c_str());

  previousDistance = currentDistance;
  previousBattery = currentBattery;

  digitalWrite(LED_BUILTIN, HIGH); // Desliga o LED

  delay(updateInterval);
}
