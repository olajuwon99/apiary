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

    logger('request is:', verb, url, body || '');
    return rp(reqOptions)
        .then(removeEmptyProperties);
};

const removeEmptyProperties = (body) => {
    return _.isArray(body) ? _.compact(body) : _.omitBy(body, _.isEmpty);
};

module.exports = request;