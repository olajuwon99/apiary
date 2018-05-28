'use strict';

const rp = require('request-promise');
const debugLogRequests = require('debug')('http');
const _ = require('lodash');

/**
 * Executes a json request
 * @param  {Object} options            request params
 * @param  {string} options.verb       http verb (get, post, etc...) defaults to GET
 * @param  {string} options.url        url of the request
 * @param  {bool}   [options.useApp]   use server instead of server.server to resolve the protocol of the request. server resolves to http. server.server resolves to the real protocol.
 * @returns {Promise}                  supertest request promise
 */
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

    debugLogRequests('request is:', verb, url, body);
    return rp(reqOptions)
        .catch(errorHandler);
};

const errorHandler = (error) => {
    return _.pick(error, ['statusCode', 'response.body.message']);
};

module.exports = {
    request,
    errorHandler
};