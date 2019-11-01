const express = require('express')
const projectRouter = require('./projectRouter')
const actionRouter = require('./actionRouter')

const router = express.Router()

router.use('/api/projects', projectRouter)
router.use('/api/actions', actionRouter)

module.exports = router