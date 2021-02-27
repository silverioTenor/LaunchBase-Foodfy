# Sistema Foodfy

Este sistema foi desenvolvido como desafio final do bootcamp LaunchBase, da [Rocketseat](https://rocketseat.com.br/).

Para Rodar este sistema é necessário executar alguns passos...

- Faça o clone do projeto para o seu computador.
- digite em seu terminal `yarn` para baixar todas as dependências necessárias.

- Crie um banco de dados com as seguintes configurações:
  ```js
  user: 'postgres',
  password: 'docker',
  host: 'localhost',
  port: '5432',
  database: 'db_foodfy'
  ```
  - Execute o [seguinte código](https://drive.google.com/file/d/1T-m3UbfCy-6bNPEEuXoQmTNMyUVDU70Q/view?usp=sharing) no banco de dados, para criação das tabelas e todos os componentes.
  > Para garantir que o código seja executado corretamente... rode-o em partes.
  
- Com o banco de dados criado, navegue até o diretório do projeto e rode o seguinte comando em seu terminal:
  ```js
  // Este comando irá criar os dados necessários para a aplicação rodar corretamente.
  yarn faker
  ```
- Uma vez criados os dados, rode o comando abaixo:
  ```js
  // Este comando irá iniciar a aplicação.
  yarn start
  ```
