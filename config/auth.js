const secret = require('./secret');
const { expressjwt } = require('express-jwt');






function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    isMember: function(req, res, next) {
        if (!req.auth || !req.auth.user) {
            return res.sendStatus(401);
        }
        if (req.auth.role !== 'member') {
            return res.sendStatus(403);
        }
        next();
    }, 
    isAdmin: function(req, res, next) {
        if (!req.auth) {
            return res.sendStatus(401);
        }
        if (req.auth.role !== 'admin') {
            return res.sendStatus(403);
        }
        next();
    },
    optional: expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader,
        credentialsRequired: false,
    })
}

module.exports = auth;