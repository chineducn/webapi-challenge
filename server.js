const express = require('express')
const cors = require('cors')
const mainRouter = require('./router')

const server = express()

server.use(express.json())
server.use(cors())

server.use('/', mainRouter)
server.get('*', (req, res) => {
    res.json("hello from serverside")
})

module.exports = server