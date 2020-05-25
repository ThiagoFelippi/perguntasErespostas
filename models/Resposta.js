const Sequelize = require("sequelize")
const connection = require("../config/db")

const Resposta = connection.define("respostas", {
    corpo: {type: Sequelize.STRING, allowNull:false},
    perguntaId: {type: Sequelize.INTEGER, allowNull: false}
})

Resposta.sync({force: false})

module.exports = Resposta