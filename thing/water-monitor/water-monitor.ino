#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <PubSubClient.h>
#include <ESP8266HTTPClient.h>

#define TrigPin 12
#define EchoPin 14

/********** WiFi Connection Details **********/
const char* ssid = "DTEL_ALBERES_2.4";
const char* password = "#MFDO1983@";

/********** MQTT Broker Connection Details **********/
const char* mqtt_server = "broker.hivemq.com"; // public MQTT broker
const char* mqtt_username = "your_mqtt_client_username";
const char* mqtt_password = "your_mqtt_client_password";
const int mqtt_port = 1883; // Porta padrão para MQTT sem TLS

/********** NTP Client Setup **********/
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

/********** MQTT Client Setup **********/
WiFiClient espClient; // Alteração para WiFiClient ao invés de WiFiClientSecure
HTTPClient http;
PubSubClient client(espClient);

/********** Global State Variables **********/
int updateInterval = 10000;
int previousBattery = 100;
const int pinA0 = A0;
const float Vin = 5.0;  // Voltagem de entrada que você quer medir (por exemplo, 5V)
const float Vref = 3.3; // Tensão de referência do ESP8266 (3.3V para o ESP8266)


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

float readDistanceSensor() {
  digitalWrite(TrigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(TrigPin, HIGH);
  delayMicroseconds(10);
  
  float durationindigit = pulseIn(EchoPin, HIGH);
  return (durationindigit / 2) / 29.1;
}

float readVoltageSensor() {
  int sensorValue = analogRead(pinA0);
  float tensao = sensorValue * (3.3 / 1023.0);
  return (sensorValue / 1023.0) * Vref;
}

void makeHttpRequest(const char* host, const char* endpoint) {

  Serial.print("Conectando a: ");
  Serial.println(host);

  if (!http.begin(espClient, "http://" + String(host) + endpoint)) {
    Serial.println("Falha ao iniciar a conexão");
    return;
  }

  int httpCode = http.GET();

  if (httpCode < 0) {
    Serial.println("Erro na requisição - " + String(httpCode));
    http.end();
    return;
  }

  if (httpCode != HTTP_CODE_OK) {
    Serial.println("Erro na resposta do servidor");
    http.end();
    return;
  }

  String payload = http.getString();

  http.end();

  Serial.println("##[RESULT]## ==> " + payload);
}

void monitor(){
  int currentHour = timeClient.getHours();
  analyser(currentHour);
}

void analyser(int hour){
  // Verifica se a hora está entre meia noite (0h) e cinco da manhã (5h)
  if (hour >= 0 && hour < 5) {
    Serial.println("A hora está entre meia noite e cinco da manhã.");
    // Faça o que precisa ser feito durante este intervalo de tempo
    // Pode ser retornado true aqui se necessário
    // executor(<valor de 1 hora>);
  } else {
    //  makeHttpRequest("192.168.18.220:3001", "/devices");
    //chamar requisição HTTP para aquamon e verificar se tem adaptação por volume
  }
}

void executor(int sleepTime){
  Serial.println(sleepTime);
  updateInterval = sleepTime;
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");

      client.subscribe("led_state"); // subscribe the topics here

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
  
  pinMode(TrigPin, OUTPUT);
  pinMode(EchoPin, INPUT);

  setupWiFi();

  client.setServer(mqtt_server, mqtt_port);
  
  timeClient.begin();
  timeClient.setTimeOffset(-10800);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  timeClient.update();
  
  unsigned long timestamp = timeClient.getEpochTime();

  int currentHour = timeClient.getHours();

  if(previousBattery < 25){
    previousBattery = 100;
  }

  int currentBattery = max(previousBattery - 1, 0);

  float distance = readDistanceSensor();
  float voltage = readVoltageSensor();

  Serial.print("\t Voltagem lida: ");
  Serial.print(voltage);

  Serial.print("\t Distancia lida: ");
  Serial.print(distance);

  String macAddress = device.macAddress;
  String message = "{\"distance\": " + String(distance) + ", \"battery\": " + String(currentBattery) + ", \"timestamp\": " + String(timestamp) + "}";

  Serial.print("\t Enviando mensagem para o tópico: ");
  Serial.println(macAddress);
  Serial.print("Mensagem: ");
  Serial.println(message);

  client.publish(macAddress.c_str(), message.c_str());
  
  previousBattery = currentBattery;

  monitor();

  digitalWrite(LED_BUILTIN, HIGH);

  delay(updateInterval);
}
