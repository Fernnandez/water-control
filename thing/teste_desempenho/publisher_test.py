import paho.mqtt.client as mqtt 
import time 
import random 
from datetime import datetime
  
BROKER="test.mosquitto.org" #O broker público é test.mosquitto.org
PORT=1883 
KEEPALIVE=60 
TOPIC="111111111111" 
inicio_random=0#valor aleatório inicial 
fim_random=50#valor aleatório limite. Referente à amperagem
time_sleep_pub=1#Referente à amperagem
  
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Conectado ao broker MQTT.")
    else:
        print("Falha na conexão. Código de retorno:", rc)

def on_publish(client, userdata, mid):
    delivery_time = datetime.now()
    print("Mensagem publicada com sucesso. Hora do envio:", userdata['publish_time'])
    print("Hora da confirmação de entrega:", delivery_time)
    delivery_duration = delivery_time - userdata['publish_time']
    print("Tempo de entrega:", delivery_duration)


#Publisher 
client = mqtt.Client() 
# Definição dos callbacks
client.on_connect = on_connect
client.on_publish = on_publish

client.connect(BROKER, PORT, KEEPALIVE) 

# Publicação da mensagem
publish_time = datetime.now()
message_info = {
    'publish_time': publish_time
}
client.user_data_set(message_info)


client.loop_start() 


 
try: 
    while True: 
        msg=random.randint(inicio_random,fim_random) #para o random entrar no loop. Inicia uma função random(nativa do python) 
        client.publish(TOPIC, msg)#publica a mensagem 
        time.sleep(time_sleep_pub)#espera o tempo da variável time_sleep_pub, ficando sem fazer nada nesse meio tempo 
except KeyboardInterrupt:#quando clicar Ctrln+C 
    print("\nSaindo") 
    client.disconnect()#Desconecta do broker 
    client.loop_stop() 