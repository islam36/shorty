const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validCreateOrUpdateUserRequest } = require('../util');
const { JWT_SECRET } = process.env;

router.post('/login', async (req, res) => {
    try {
        if (validCreateOrUpdateUserRequest(req.body)) {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const token = jwt.sign({
                        id: user._id.toString()
                    }, JWT_SECRET);

                    res.json({
                        message: 'logged in successfully',
                        token,
                        user
                    });
                } else {
                    res.status(400).json({
                        message: 'wrong password'
                    });
                }
            } else {
                res.status(404).json({
                    message: 'no user with that username is found'
                })
            }
        } else {
            res.status(400).json({
                message: 'bad request'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });
    }
});

module.exports = router;