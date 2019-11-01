const express = require('express')
const projectDb = require('../data/helpers/projectModel')
const {
    validateProjectList,
    validateProject
} = require('../middleware')

const router = express.Router()

router.get('/', validateProjectList, (req, res, next) => {
    res
        .status(200)
        .json(req.projects)
})

router.post('/', validateProject, (req, res, next) => {
    projectDb.insert(req.body)
        .then(newProject => {
            res
                .status(201)
                .json(newProject)
        })
        .catch(error => {
            next({
                message: "There was an error in the creation of the new project. Check project list for confirmation" + error.message
            })
        })
})

module.exports = router