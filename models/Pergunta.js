const Sequelize = require("sequelize")
const connection = require("../config/db")

const Pergunta = connection.define("perguntas", {
    titulo: {type: Sequelize.STRING, allowNull: false},
    descricao: {type: Sequelize.TEXT, allowNull: false},
})

Pergunta.sync({force: false})
    .then(() => console.log("Tabela criada com sucesso"))
    .catch(err => console.log(`Erro ao executar o banco -> ${err}`))

module.exports = Pergunta