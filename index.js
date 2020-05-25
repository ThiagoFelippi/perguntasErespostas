const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./config/db")
const Pergunta = require("./models/Pergunta")
const Resposta = require("./models/Resposta")

connection.authenticate()
    .then(() => console.log("Banco conectado com sucesso"))
    .catch(err => console.log(`Ocorreu um erro ao conectar --> ${err}`))

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const porta = 8080

app.get("/", (req,res) => {
    Pergunta.findAll({order: [['id', 'DESC']]})
        .then(perguntas => res.render("index", {perguntas}))
        .catch(err => res.send(`Erro ao enviar a pergunta ` + err))
})

app.get("/perguntar", (req,res) => {
    res.render("perguntar")
})

app.post("/salvarPergunta", (req,res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    Pergunta.create({titulo, descricao})
        .then(() => res.redirect("/"))
        .catch(err => res.send("Erro ao criar dados no banco de dados"))
})

app.get("/pergunta/:id", (req,res) => {
    const id = req.params.id
    Pergunta.findOne({where: {'id': id}})
        .then(pergunta => {
            if(pergunta){
                 Resposta.findAll({where:{ perguntaId : pergunta.id }})
                    .then(respostas => {
                        res.render("pergunta", {pergunta, respostas})
                    })
            }else{
                const mensagem = "Pergunta não encontrada"
                res.redirect('/')
            }
        })
        .catch(err => res.redirect("/"))
})

app.post("/responder", (req,res) => {
    const corpo = req.body.corpo
    const perguntaId = req.body.id
    Resposta.create({corpo, perguntaId})
        .then(() => res.redirect(`/pergunta/${perguntaId}`))
})

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
})