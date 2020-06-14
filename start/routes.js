'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Rota para apresentação de produto
Route.get('/produtos/:id', 'ProdutoController.show');

// Rota para criação de produto
Route.post('/produtos', 'ProdutoController.store');

// Rota para atualização de produto
Route.put('/produtos/:id', 'ProdutoController.update');

// Rota para deletar produto
Route.delete('/produtos/:id', 'ProdutoController.destroy');

// Rota para efetuar venda do produto
Route.post('/produtos/:id/sell', 'ProdutoController.sell');

// Rota para consultar estoque do produto
Route.get('/produtos/:id/estoque', 'ProdutoController.estoque');

// Rota para checar reposição do do produto
Route.get('/produtos/:id/reposicao', 'ProdutoController.reposicao');