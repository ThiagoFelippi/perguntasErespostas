const Sequelize = require("sequelize")
const connection = new Sequelize("curso_udemy", "root", "Thiago241103", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection