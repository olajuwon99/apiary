'use strict';

const _ = require('lodash');
const { STATUS_CODES } = require('statuses');
const logger = require('debug')('http');

const errorHandler = (err, req, res, next) => {
    logger('\nError caught ', JSON.stringify(err));

    const { statusCode = 404 } = err;
    res.status(statusCode);
    if (res.headersSent) {
        return next(err);
    }

    const message = getErrorMessage(err);
    const reason = STATUS_CODES[statusCode];
    res.send({
        message: `${req.method} operation failed. ${message}`,
        reason
    });
    return err;
};

const getErrorMessage = (err) => {
    const extractor = path => _.chain(err)
        .get(path)
        .capitalize()
        .value();
    return extractor('error.message') ||
        extractor('error.error.message') ||
        extractor('response.body.message') ||
        extractor('response.body.error.message') ||
        extractor('message');

};

module.exports = errorHandler;