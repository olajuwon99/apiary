'use strict';

global.Promise = require('bluebird');
const { Router } = require('express');
const router = Router();
const { urlencoded, json } = require('body-parser');
router.use(urlencoded({ extended: true }));
router.use(json());

const userService = require('../services/userService');

// CREATES A NEW USER
router.post('/', (req, res) => {
    const token = req.headers.authorization;
    return userService.createUser(req.body, token)
        .then(user => {
            return res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res) => {
    const token = req.headers.authorization;
    return userService.getUsers(token)
        .then(users => {
            return res.status(200).send(users);
        });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', (req, res) => {
    const token = req.headers.authorization;
    return userService.getUser(req.params.id, token)
        .then(user => {
            if (!user) {
                return res.status(404).send('No user found.');
            }
            return res.status(200).send(user);
        });
});

// DELETES A USER FROM THE DATABASE
/* router.delete('/:id', (req, res) => {
    return userService.findByIdAndRemove(req.params.id)
        .then(user => {
            return res.status(200).send('User ' + user.name + ' was deleted.');
        });
}); */

// UPDATES A SINGLE USER IN THE DATABASE
/* router.put('/:id', (req, res) => {
    return userService.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            return res.status(200).send(user);
        });
}); */

module.exports = router;