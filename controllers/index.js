'use strict';
const _ = require('lodash');
const { Router } = require('express');
const { urlencoded, json } = require('body-parser');

const { errorHandler } = require('../services/restService');

module.exports = function(app) {

    // before
    app.use(urlencoded({ extended: true }));
    app.use(json());

    const userController = require('./userController')(Router());

    // todo - change to resource: { route, controller }
    const ROUTES = {
        users: userController
    };
    _.each(ROUTES, (controller, route) => {
        app.use(`/${route}`, controller);
    });
    // after
    app.use(errorHandler);

};