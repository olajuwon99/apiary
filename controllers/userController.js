'use strict';

global.Promise = require('bluebird');
const userService = require('../services/userService');
module.exports = function(router) {

    // CREATES A NEW USER
    router.post('/', (req, res, next) => {
        const token = req.headers.authorization;
        userService.createUser(req.body, token)
            .then(user => {
                res.status(200).send(user);
            })
            .catch(next);
    });

    // RETURNS ALL THE USERS IN THE DATABASE
    router.get('/', (req, res, next) => {
        const token = req.headers.authorization;
        userService.getUsers(token)
            .then(users => {
                res.status(200).send(users);
            })
            .catch(next);
    });

    // GETS A SINGLE USER FROM THE DATABASE
    router.get('/:id', (req, res, next) => {
        const token = req.headers.authorization;
        userService.getUser(req.params.id, token)
            .then(user => {
                res.status(200).send(user);
            })
            .catch(next);
    });

    // DELETES A USER FROM THE DATABASE
    router.delete('/:id', (req, res, next) => {
        const userId = req.params.id;
        const token = req.headers.authorization;

        userService.deleteUser(userId, token)
            .then(() => {
                res.status(204);
            })
            .catch(next);
    });

    // UPDATES A SINGLE USER IN THE DATABASE
    router.put('/:id', (req, res, next) => {
        const userId = req.params.id;
        const token = req.headers.authorization;

        return userService.updateUser(userId, req.body, token)
            .then(user => {
                return res.status(200).send(user);
            })
            .catch(next);
    });

    return router;
};