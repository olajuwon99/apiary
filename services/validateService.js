'use strict';

const validateId = (req, res, next, id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        next();
    } else {
        const err = new Error('Invalid mongoId');
        err.statusCode = 400;
        next(err);
    }
};

module.exports = {
    validateId
};