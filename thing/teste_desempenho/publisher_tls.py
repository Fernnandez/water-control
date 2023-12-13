import paho.mqtt.client as mqtt
import ssl
import time
import random
import datetime
from decimal import Decimal
import os
import csv

BROKER = "f9ca89e3f5df46e6a4b2e122b2d56a3c.s2.eu.hivemq.cloud"
PORT = 8883
KEEPALIVE = 60
TOPIC = "111111111111"
inicio_random = 0
fim_random = 50
time_sleep_pub = 0

contador = 0
valor_maximo_media = 110000

#margem
valor_eliminado_margem = 10 #Valor para eliminar a margem de erro(envios iniciais). esses valores nao vao ser utilizados


#soma dos valores
soma = 0
media = 0
media_escrita = False


#manipulação do arquivo
data_arquivo = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
FILENAME = f"./csv_with_tls/resultado_{data_arquivo}.csv"




def encontrar_maior_e_menor_valor(arquivo):
    maior_valor = None
    menor_valor = None

    with open(arquivo, 'r') as arquivo_csv:
        linhas = arquivo_csv.readlines()

        # Iterar sobre as linhas do arquivo
        for linha in linhas:
            valor = linha.strip()  # Remover espaços em branco no início e no fim

            # Ignorar linhas que não possuem valores numéricos
            if not valor.replace('.', '').isdigit():
                continue

            valor = float(valor)  # Converter a linha em um valor float

            # Atualizar o maior valor se for o caso
            if maior_valor is None or valor > maior_valor:
                maior_valor = valor

            # Atualizar o menor valor se for o caso
            if menor_valor is None or valor < menor_valor:
                menor_valor = valor

    # Adicionar os valores destacados no final do arquivo
    with open(arquivo, 'a') as arquivo_csv:
        arquivo_csv.write(f'\nMaior valor: {maior_valor}\n')
        arquivo_csv.write(f'Menor valor: {menor_valor}\n')



def escrever_antes_media(valor):
    if os.path.exists(FILENAME):
        # Abrir o arquivo existente em modo de adição (append)
        with open(FILENAME, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([valor])
        file.close()
    else:
        with open(FILENAME, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([valor])
        file.close()
        
def escrever_media(media):
    if os.path.exists(FILENAME):
        # Abrir o arquivo existente em modo de adição (append)
        with open(FILENAME, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([f"Media: {media}"])
        file.close()
    else:
        with open(FILENAME, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([f"Media: {media}"])
        file.close()
        

def calculo_media(delivery_duration):
    global media_escrita,contador,soma,valor_maximo_media,valor_eliminado_margem,media
    if(contador <= valor_maximo_media):
        if(contador<=valor_eliminado_margem):
           contador+=1 
        else:
           soma+=delivery_duration
           contador+=1 
           escrever_antes_media(delivery_duration)
    else:
        media = soma/(valor_maximo_media-valor_eliminado_margem)
        print("===============================")
        print("Media obtida: "+str(media))
        print("===============================")
        if not media_escrita:
            escrever_media(media)
            encontrar_maior_e_menor_valor(FILENAME)
            media_escrita = True




def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Conectado ao broker MQTT")
        client.subscribe(TOPIC)
    else:
        print("Falha na conexão. Código de retorno MQTT:", rc)


   



def on_publish(client, userdata, mid):
    delivery_time = (Decimal(datetime.datetime.now().timestamp()) * Decimal('1000'))
    print("Mensagem publicada com sucesso. Hora do envio:", userdata['publish_time'])
    print("Hora da confirmação de entrega:", delivery_time)
    delivery_duration = delivery_time - userdata['publish_time']
    print("Tempo de entrega:", delivery_duration)
    calculo_media(delivery_duration)

client = mqtt.Client()
client.on_connect = on_connect
client.on_publish = on_publish


# Configurar TLS/SSL
client.tls_set(ca_certs="./certificado.pem", certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED,
               tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)

# Configurar nome de usuário e senha
client.username_pw_set("username", "@MQTT-password1")

# Conectar ao broker
client.connect(BROKER, PORT, KEEPALIVE)

publish_time = (Decimal(datetime.datetime.now().timestamp()) * Decimal('1000'))
message_info = {
    'publish_time': publish_time
}
client.user_data_set(message_info)

# Iniciar loop para tratamento de eventos
client.loop_start()

try:
    while True:
        msg = random.randint(inicio_random, fim_random)
        client.publish(TOPIC, msg)
        time.sleep(time_sleep_pub)
        publish_time = int(datetime.datetime.now().timestamp() * 1000)
        message_info = {
            'publish_time': publish_time
        }
        client.user_data_set(message_info)
except KeyboardInterrupt:
    print("\nSaindo")
    client.disconnect()
    client.loop_stop()

