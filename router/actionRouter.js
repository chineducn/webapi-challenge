const express = require('express')
const {
    validateProjectList,
    validateProjectId,
    validateActionList,
    validateActionId
} = require('../middleware')
//todo get(id), insert(action), update(id, changes), remove(id)
const router = express.Router()
const actionGetValidation = [validateProjectList, validateProjectId, validateActionList, validateActionId]

router.get('/:id/actions/:action_id', actionGetValidation, (req, res, next) => {
    res.status(200).json(req.action)
})

module.exports = router