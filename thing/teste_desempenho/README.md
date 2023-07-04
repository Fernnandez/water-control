# Teste de Latência na Comunicação via MQTT

Este teste teve como objetivo comparar a latência na comunicação via MQTT com e sem TLS.

Foram realizadas 100.000 publicações em ambos os casos, com e sem TLS. Os primeiros 10 casos foram eliminados para obter uma média mais precisa. No [Publisher com TLS](publisher_tls.py) e [Publisher sem o TLS](publisher_without_tls.py),como não há um time/sleep no laço que faz o publisher(método publish), a execução do publish acontecerá da maneira muito mais rápida, afinal, poderá ser feito até milhares de publicações em um segundo

## Resultados

Ao analisar os resultados, constatamos o seguinte:

Com uma diferença de 0.105516229645643836375034185, observamos que o tráfego de pacotes com a autenticação TLS aumentou a latência da rede em aproximadamente 18,43%.

Considerando os benefícios trazidos pela criptografia, como a proteção dos dados, essa diferença na latência pode ser considerada aceitável.

## Métricas

Aqui estão as métricas utilizadas para o cálculo da latência:

- Média da latência da comunicação sem TLS: 0.4672949336877637840167287935
- Média da latência da comunicação com TLS: 0.5728111633334076203927629785

## Velocidade da Internet

Durante o teste, a velocidade da internet utilizada foi a seguinte:

- Velocidade de download: 250 Mb/s
- Velocidade de upload: 150 Mb/s


## Cálculo do resultado

Sabe-se que o TLS irá ter uma latência maior, já que o tamanho do pacote também será maior.

O cálculo do resultado do teste foi feito da seguinte maneira: 

- Diferença em valor bruto = (Média da latência da comunicação com TLS) - (Média da latência da comunicação sem TLS)
- Valor percentual da diferença = ((Diferença em valor bruto) / (Média da latência da comunicação com TLS)) * 100
## Pastas de Testes

- [Diretório com planilhas contendo os testes da latência com TLS](./csv_with_tls).
- [Diretório com planilhas contendo os testes da latência sem TLS](./csv_without_tls).

