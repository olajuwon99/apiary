'use strict';
const _ = require('lodash');
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');

const errorHandler = require('../services/errorService');

module.exports = function(app) {

    // before
    app.use(urlencoded({ extended: true }));
    app.use(json());

    const userController = require('./userController');

    const ROUTES = {
        users: userController
    };
    _.each(ROUTES, (controller, route) => {
        const router = injectRouter(controller);
        app.use(`/${route}`, router);
    });
    // after
    app.use(errorHandler);

};

const injectRouter = (controller) => {
    const router = Router();
    controller(router);
    return router;
};