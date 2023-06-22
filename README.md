# Projeto water-control

Este é um guia de início rápido para configurar e executar o projeto water-control.

## Clonar o repositório

Execute o seguinte comando para clonar o repositório water-control:

git clone <https://github.com/Fernnandez/water-control>

## Instalação do Docker e Docker Compose
O Docker e o Docker Compose são utilizados para subir os serviços do PostgreSQL e Mosquitto no projeto water-control.
 
Siga as instruções abaixo para instalá-los:

Se você não tiver o Docker instalado, siga as instruções abaixo para instalar o Docker e o Docker Compose:

1. **Docker**:
   - **Windows**: Baixe e instale o Docker Desktop a partir do [site oficial do Docker](https://www.docker.com/products/docker-desktop).
   - **Mac**: Baixe e instale o Docker Desktop a partir do [site oficial do Docker](https://www.docker.com/products/docker-desktop).
   - **Linux**: Siga as instruções de instalação do Docker para a sua distribuição específica. Consulte a [documentação oficial do Docker](https://docs.docker.com/engine/install/).

2. **Docker Compose**:
    - O Docker Compose geralmente já está incluído nas instalações do Docker Desktop para Windows e Mac. Para Linux, siga as instruções [aqui](https://docs.docker.com/compose/install/).

Assim que instalado: 

utilize o comando na `raiz` do projeto

`docker compose up -d`

para que as imagens sejam ativadas. 

## Configurar a API

Após clonar o repositório water-control, siga estas etapas para configurar a API:

1. Navegue até o diretório `api`:

`cd water-control/api`


2. Instale as dependências com o seguinte comando:

`npm install`

3. Inicie o servidor de desenvolvimento:

`npm run start:dev`

## Configurar o Front-end

Para configurar o front-end do projeto water-control, siga estas etapas:

1. Navegue até o diretório `front`:

`cd water-control/front`


2. Instale as dependências com o seguinte comando:

`npm install`

3. Inicie o servidor de desenvolvimento:

`npm run dev`

## Configurar o Dispositivo Simulado

Para configurar o dispositivo simulado no projeto water-control, siga estas etapas:

1. Navegue até o diretório `thing`:

`cd water-control/thing `

2. Instale as dependências com o seguinte comando:

`npm install`

3. Inicie o dispositivo simulado:

`npm run dev`
## Informações adicionais

- **Nome do Projeto**: water-control
- **Licença**: MIT
- **Integrantes**: 
  - Angelo Fernandes
  - Davi Luna
  - Pedro Marinho
- **Disciplina**: IOT
- **Professor**: David Cavalcanti.