## Setup

Instalar previamente o NodeJS, NPM, e MySQL.

Criar o banco localmente com o nome configurado no .env, juntamente com o password e user.

Executar o comando `npm i` no diretorio raiz.

Executar o comando `adonis migration:run`

Executar o comando `adonis serve --dev`


### Rotas

GET / produtos/:id -> Exibição do produto (id pelo parametro)

POST / produtos -> Criação do produto (dados pelo body)

PUT / produtos/:id -> Aualização dos dados do produto (dados pelo body e id pelo parametro)

DELETE / produtos/:id -> Deleta o produto (id pelo parametro)

POST / produtos/:id/sell -> Realiza a venda do produto (id pelo parametro e quantidade pelo body)

GET / produtos/:id/estoque -> Checa o estoque (id pelo parametro)

GET / produtos/:id/reposicao -> Checa se o produto necessita de reposição (id pelo parametro)