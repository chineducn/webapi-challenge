const express = require('express')
const cors = require('cors')
const mainRouter = require('./router')
const { logger, errorHandler } = require('./middleware')

const server = express()

server.use(express.json())
server.use(cors())

server.use(logger)
server.use('/', mainRouter)
server.use(errorHandler)


module.exports = server