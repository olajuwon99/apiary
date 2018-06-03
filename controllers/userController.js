'use strict';

global.Promise = require('bluebird');
const userService = require('../services/userService');
const { validateId } = require('../services/validateService');

module.exports = function(router) {

    router.post('/', (req, res, next) => {
        const token = req.headers.authorization;
        userService.createUser(req.body, token)
            .then(user => {
                res.status(200).send(user);
            })
            .catch(next);
    });

    router.get('/', (req, res, next) => {
        const token = req.headers.authorization;
        userService.getUsers(token)
            .then(users => {
                res.status(200).send(users);
            })
            .catch(next);
    });

    router.param('id', validateId);

    router.get('/:id', (req, res, next) => {
        const token = req.headers.authorization;
        userService.getUser(req.params.id, token)
            .then(user => {
                res.status(200).send(user);
            })
            .catch(next);
    });

    router.delete('/:id', (req, res, next) => {
        const userId = req.params.id;
        const token = req.headers.authorization;

        userService.deleteUser(userId, token)
            .then(() => {
                res.status(204);
            })
            .catch(next);
    });

    router.put('/:id', (req, res, next) => {
        const userId = req.params.id;
        const token = req.headers.authorization;

        return userService.updateUser(userId, req.body, token)
            .then(user => {
                return res.status(200).send(user);
            })
            .catch(next);
    });

    router.patch('/:id', (req, res, next) => {
        const userId = req.params.id;
        const token = req.headers.authorization;

        return userService.updateUserProperties(userId, req.body, token)
            .then(user => {
                return res.status(200).send(user);
            })
            .catch(next);
    });
};