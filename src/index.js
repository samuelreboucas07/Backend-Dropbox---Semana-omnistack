const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

// Isolando o realtime entre salas
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

// Utiliza código js para manipular dados no mongodb.
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-m8mtp.mongodb.net/omnistack?retryWrites=true&w=majority', 
{useNewUrlParser: true})

app.use((req, res, next) => {
    req.io = io
    return next()
})

app.use(express.json())
// PERMITE TRANSFERÊNCIA DE ARQUIVOS NAS REQUISIÇÕES
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

// 40 MIN DO VÍDEO

server.listen(3000)

// Ao colocar o socket.io e add o server a aplicação passa a ouvir
//requisições http e websocket