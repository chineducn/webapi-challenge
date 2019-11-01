const projectDb = require('../data/helpers/projectModel')
const actionDb = require('../data/helpers/actionModel')


module.exports = {
    logger: logger,
    errorHandler: errorHandler,
    validateProjectList: validateProjectList,
    validateProject: validateProject,
    validateProjectId: validateProjectId,
    validateActionList: validateActionList,
    validateActionId: validateActionId,
    validateAction: validateAction,
}

function validateAction(req, res, next) {
    const { description, notes } = req.body
    if (!Object.keys(req.body).length) {
        next({
            status: 400,
            message: "Missing action details"
        })
    }
    else if (!notes || !description) {
        next({
            status: 400,
            message: "Missing notes or description field"
        })
    }
    else {
        next()
    }
}

function validateActionId(req, res, next) {
    const { action_id } = req.params
    if (isNaN(Number(action_id))) {
        next({
            status: 400,
            message: "The action id of " + action_id + " is not a valid number."
        })
    }
    else {
        actionDb.get(action_id)
            .then(action => {
                if (action) {
                    req.action = action
                    next()
                }
                else {
                    next({
                        status: 404,
                        message: "The action of id " + action_id + " does not exist in the database."
                    })
                }
            })
            .catch(error => {
                next({message: "There was an error in searching for the action of id " + action_id + " in the database" + error.message})
            })
    }
}

function validateActionList(req, res, next) {
    const { id } = req.params
    projectDb.getProjectActions(id)
        .then(actions => {
            if (actions.length) {
                req.actions = actions
                next()
            }
            else {
                res
                    .status(404)
                    .json({message: "The project of id " + id + " has no associated actions"})  
            }
        })
        .catch(error => {
            next({message:"There was an error in retrieving the actions of project id " + id + ". " + error.message})
        })
}

function validateProjectId(req, res, next) {
    const { id } = req.params
    if (isNaN(Number(id))) {
        next({
            status: 400,
            message: "The project id of " + id + " is not a valid number."
        })
    }
    else {
        projectDb.get(id)
            .then(project => {
                if (project) {
                    req.project = project
                    next()
                }
                else {
                    next({
                        status: 404,
                        message: "The project of id " + id + " does not exist in the database."
                    })
                }
            })
            .catch(error => {
                next({message: "There was an error in searching for the project of id " + id + " in the database" + error.message})
            })
    }
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