'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
    static boot () {
        super.boot()
    
        this.addHook('beforeSave', async (produtoInstance) => {
            produtoInstance.qtd_register = produtoInstance.qtd_estoque
        })
      }
}

module.exports = Produto
