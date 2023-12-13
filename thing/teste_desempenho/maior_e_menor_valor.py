






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

    return maior_valor, menor_valor

# Exemplo de uso
arquivo = f"./csv_without_tls/resultado_2023-07-04_05-34-24.csv"
maior_valor, menor_valor = encontrar_maior_e_menor_valor(arquivo)

print(f'O maior valor é: {maior_valor}')
print(f'O menor valor é: {menor_valor}')
