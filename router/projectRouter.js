const express = require('express')
const projectDb = require('../data/helpers/projectModel')
const {
    validateProjectList,
    validateProject,
    validateProjectId,
} = require('../middleware')

const router = express.Router()

router.get('/', validateProjectList, (req, res, next) => {
    res
        .status(200)
        .json(req.projects)
})

router.get('/:id', validateProjectList, validateProjectId, (req, res, next) => {
    res
        .status(200)
        .json(req.project)
})

router.delete('/:id', validateProjectList, validateProjectId, (req, res, next) => {
    const { id } = req.params
    projectDb.remove(id)
        .then(data => {
            res
                .status(200)
                .json({
                    message: "The project of id " + id + " was successfully removed."
                })
        })
        .catch(error => {
            next({
                message: "There was an error in the removal of project id " + id + " from the database. Please check the project list" + error.message
            })
        })
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