const express = require('express')
const projectDb = require('../data/helpers/projectModel')
const { validateProjectList } = require('../middleware')

const router = express.Router()

router.get('/', validateProjectList, (req, res, next) => {
    res
        .status(200)
        .json(req.projects)
})

module.exports = router