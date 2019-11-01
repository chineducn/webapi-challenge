const express = require('express')
const actionDb = require('../data/helpers/actionModel')
const {
    validateProjectList,
    validateProjectId,
    validateActionList,
    validateActionId
} = require('../middleware')
//todo insert(action), update(id, changes)
const router = express.Router()
const actionGetValidation = [validateProjectList, validateProjectId, validateActionList, validateActionId]

router.get('/:id/actions/:action_id', actionGetValidation, (req, res, next) => {
    res.status(200).json(req.action)
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