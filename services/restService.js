'use strict';

const rp = require('request-promise');
const logger = require('debug')('http');
const _ = require('lodash');

const request = ({ verb = 'GET', url, body, token, headers = {}, qs = {}, ...options } = {}) => {
    const defaultHeader = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    };

    const reqOptions = {
        method: verb.toUpperCase(),
        baseUrl: `http://${process.env.SERVER_URL}:${process.env.PORT}`,
        url,
        body,
        headers: _.merge(defaultHeader, headers),
        qs,
        json: true,
        resolveWithFullResponse: false,
        transform2xxOnly: true
    };

    logger('request is:', verb, url, body);
    return rp(reqOptions)
        .then(removeEmptyProperties);
};

const removeEmptyProperties = (body) => {
    return _.isArray(body) ? _.compact(body) : _.omitBy(body, _.isEmpty);
};

const errorHandler = (err, req, res, next) => {

    res.status(500).send('you are bad');
    const resError = new Error();
    let { statusCode, options: { method }, ...response } =
    _.pick(err, ['statusCode', 'options.method', 'response.body.message', 'response.body.error.message']);

    res.status(statusCode);
    resError.message = response.message || response.errMsg || `${method} operation failed`;
    if (res.headersSent) {
        return next(err);
    }

    logger('\nError caught ', JSON.stringify(resError));
    res.send({ error: resError });
    return resError;
};

module.exports = {
    request,
    errorHandler
};