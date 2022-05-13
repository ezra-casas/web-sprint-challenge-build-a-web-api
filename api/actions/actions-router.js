// Write your "actions" router here!
const express = require('express');
const Actions = require('../actions/actions-model');

const {
    validateActionsId,
    validateAction
} = require('../actions/actions-middlware')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(arrayOfActions => {
            res.status(200).json(arrayOfActions)
        })
});

router.get('/:id', validateActionsId, (req, res) => {
    res.json(req.existingAction)
})

router.post('/', validateActionsId, validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            console.log(action)
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(400).json({ message: 'missing required fields' })
        })
});

router.put('/:id', validateActionsId, validateAction,(req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(400).json({ message: 'missing required fields'})
        })
})

router.delete('/:id', validateActionsId, (req, res) => {
    Actions.remove(req.existingAction.id)
        .then(() => {
            res.status(200).json(req.existingAction);
        })
        .catch(error => {
            res.status(404).json({ message: 'no associated action' })
        })
})


module.exports = router