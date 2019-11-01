const express = require('express')
const actionDb = require('../data/helpers/actionModel')
const {
    validateProjectList,
    validateProjectId,
    validateActionList,
    validateActionId,
    validateAction,
} = require('../middleware')

const router = express.Router()
const actionGetValidation = [validateProjectList, validateProjectId, validateActionList, validateActionId]
const actionPostValidation = [validateProjectList, validateProjectId, validateAction]
const actionPutValidation = [validateProjectList, validateProjectId, validateAction, validateActionId]

router.get('/:id/actions/:action_id', actionGetValidation, (req, res, next) => {
    res.status(200).json(req.action)
})

router.post('/:id/actions/', actionPostValidation, (req, res, next) => {

    actionDb.insert({...req.body, project_id: req.params.id})
        .then(newAction => {
            res
                .status(201)
                .json(newAction)
        })
        .catch(error => {
            next({
                message: "There was an error in the creation of the new action in project id " + req.params.id + ". Check action list for confirmation" + error.message
            })
        })
})

router.put('/:id/actions/:action_id', actionPutValidation, (req, res, next) => {
    const { id, action_id } = req.params
    const newDetails = {...req.body, project_id: id}
    actionDb.update(action_id, newDetails)
        .then(updatedAction => {
            res
                .status(200)
                .json(updatedAction)
        })
        .catch(error => {
            next({message: "There was an error in making changes on action id " + action_id + " in project id " + id + ". Please confirm from the action list. " + error.message})
        })
})

router.delete('/:id/actions/:action_id', actionGetValidation, (req, res, next) => {
    const { action_id } = req.params
    actionDb.remove(action_id)
        .then(data => {
            res
                .status(200)
                .json({
                    message: "The action of id " + action_id + " was successfully removed."
                })
        })
        .catch(error => {
            next({
                message: "There was an error in the removal of action id " + action_id + " from the database. Please check the action list" + error.message
            })
        })
})

module.exports = router