#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>//biblioteca para serializar o json

const char* ssid = "Davifurao";
const char* password = "12345678";
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";
const char* topic = "aquamon02";//por enquanto o topico não esta mudando(sendo o mac do dispositivo)
int value = 1000;
int limiteReservatorio = 1000;
float baterias = 100;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  client.setServer(mqttServer, mqttPort);
  while (!client.connect("NodeMCU", mqttUser, mqttPassword)) {
    Serial.println("Connecting to MQTT...");
    delay(500);
  }
  Serial.println("Connected to MQTT");
}

void loop() {
  DynamicJsonDocument jsonDocument(200);
  
  String macAddress = "00:1B:44:11:3A:B7"; // Exemplo de endereço MAC
  int bateria = baterias; // Valor da bateria
  int distancia = value; // Valor da distância
  
  jsonDocument["macAddress"] = macAddress;
  jsonDocument["bateria"] = bateria;
  jsonDocument["distancia"] = distancia;
  
  char jsonBuffer[200];
  serializeJson(jsonDocument, jsonBuffer);
  
  client.publish(topic, jsonBuffer);
  value = random((value - 5),(value + 5));//decrementa em 5 o valor da distancia da caixa
  
  baterias -= 1; // Decrementa o valor da bateria(1%) a cada iteração. O valor que é decrementado é o que é determinado no início
   if(value >limiteReservatorio && bateria > 0){
    value = limiteReservatorio;
    client.publish(topic, jsonBuffer);
  }
  if(value < 0 && bateria > 0){
    value = 0;
    client.publish(topic, jsonBuffer);
  }
  if (value < 0 && bateria > 0) {
    value = 0;
    client.publish(topic, jsonBuffer);
  }
  
  delay(5000);
}
