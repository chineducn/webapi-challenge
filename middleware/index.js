const projectDb = require('../data/helpers/projectModel')


module.exports = {
    logger: logger,
    errorHandler: errorHandler,
    validateProjectList: validateProjectList,
    validateProject: validateProject,
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!Object.keys(req.body).length) {
        next({
            status: 400,
            message: "Missing project details"
        })
    }
    else if (!name || !description) {
        next({
            status: 400,
            message: "Missing name or description field"
        })
    }
    else {
        next()
    }
}

function validateProjectList(req, res, next) {
    projectDb.get()
        .then(projects => {
            if (projects.length) {
                req.projects = projects
                next()
            }
            else {
                next({
                    status: 404,
                    message: "There are no saved projects"
                })
            }
        })
        .catch(error => {
            next({
                message: "There was an error in retrieving the project list" + error.message
            })
        })
}

function errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            method: req.method,
            url: req.url,
            success: false,
            message: err.message || "There was an error in the execution of the task"
        })
}

function logger(req, res, next) {
    console.log(`A ${req.method} request from url ${req.url} was made at ${new Date().toISOString()}`)
    next()
}