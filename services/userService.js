'use strict';

const { request } = require('./restService');

/* todo - implementation of the REST operations */
// todo - add validation prior CRUD operations
const URL = '/api/user';

const createUser = (user, token) => {
    return request({
        verb: 'POST',
        url: URL,
        body: user,
        token
    });
};

const getUsers = (token) => {
    return request({
        verb: 'GET',
        url: URL,
        token,
        qs: {
            filter: {
                fields: ['_id', 'firstName', 'lastName']
            }
        }
    });
};

const getUser = (userId, token) => {
    return request({
        verb: 'GET',
        url: `${URL}/${userId}`,
        token,
        qs: {
            filter: {
                fields: ['_id', 'username', 'email', 'firstName', 'lastName', '_lmt', '_ect', '_tenantRef', 'tags', 'role', 'language', 'company', 'address']
            }
        }
    });
};

const deleteUser = (userId, token) => {
    return request({
        verb: 'DELETE',
        url: `${URL}/${userId}`,
        token
    });
};

const updateUser = (userId, user, token) => {
    return request({
        verb: 'PUT',
        url: `${URL}/${userId}`,
        body: user,
        token
    });
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
};