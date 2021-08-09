const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = process.env;

async function checkAuthHeader(headers) {
    const { authorization } = headers;
    if (authorization && typeof(authorization) === 'string') {
        const splitted = authorization.split(' ');
        if(splitted.length === 2) {
            const [bearer, token] = splitted;

            if(bearer === 'Bearer') {
                const { id: userId } = jwt.verify(token, JWT_SECRET);

                if(userId) {
                    const user = await User.findById(userId);
                    if(user) {
                        return user;
                    }
                }
            }
        }
    }

    return null;
}

module.exports = async (req, res, next) => {
    try {
        const result = await checkAuthHeader(req.headers);
        if(result) {
            req.user = result;
            next();
        } else {
            res.status(401).json({
                message: 'unauthorized to perform this request'
            });
        }
    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            res.status(401).json({
                message: 'expired token'
            })
        } else {
            res.status(500).json({
                message: 'server error'
            })
        }
    }
};