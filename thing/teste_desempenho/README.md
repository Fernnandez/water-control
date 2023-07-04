# Comparação de Latência na Comunicação via MQTT

Este projeto teve como objetivo comparar a latência na comunicação via MQTT com e sem TLS.

Foram realizadas 100.000 publicações em ambos os casos, com e sem TLS. Os primeiros 10 casos foram eliminados para obter uma média mais precisa.

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

## Pastas de Testes

- [Diretório com planilhas contendo os testes da latência com TLS](./csv_with_tls).
- [Diretório com planilhas contendo os testes da latência sem TLS](./csv_without_tls).

