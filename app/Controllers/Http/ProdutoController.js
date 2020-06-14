'use strict'

const Produto = use('App/Models/Produto');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['nome', 'descricao', 'qtd_estoque']);

    const produto = await Produto.create(data);

    return produto;
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const produto = await Produto.findOrFail(params.id);

    return produto;
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['nome', 'descricao', 'qtd_estoque']);

    const produto = await Produto.findOrFail(params.id);

    produto.merge(data)

    await produto.save()

    return produto;
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)

    await produto.delete();
  }

  /**
   * Venda de um produto com id.
   * POST produtos/:id/sell
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async sell({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)

    const data = request.only(['qtd_venda']);

    const estoque = produto.qtd_estoque - data.qtd_venda;

    if (estoque < 0) {
      throw new Error('Não foi possivel efetuar esta venda pois a quantidade de itens solicitados é maior que a quantidade do estoque.')
    } else {
      await produto.merge({ qtd_estoque: estoque })
      await produto.save()
    }

    return produto;
  }

  /**
   * Consulta estoque de um produto com id.
   * GET produtos/:id/estoque
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async estoque({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)

    return { 'qtdEmEstoque': produto.qtd_estoque };
  }

  /**
   * Consulta a necessidade de reposição do estoque.
   * GET produtos/:id/estoque
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async reposicao({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)

    if (((produto.qtd_register/100) * 30) > produto.qtd_estoque) {
      return { 'reporEstoque': true };
    }

    return { 'reporEstoque': false };
  }
}

module.exports = ProdutoController
