const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {
    validCreateOrUpdateUserRequest,
    userExists,
    SALT_ROUNDS
} = require('../util');
const isAuth = require('../middleware/isAuth');

router.post('/', async (req, res) => {
    try {
        if (validCreateOrUpdateUserRequest(req.body)) {
            if(await userExists(req.body.username)) {
                res.status(400).json({
                    message: 'username already used'
                });

            } else {
                const user = await User.create({
                    username: req.body.username,
                    password: await bcrypt.hash(req.body.password, SALT_ROUNDS)
                });

                res.status(201).json({
                    message: 'user created sucessfully',
                    user
                });
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



router.get('/:userId', isAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        if(userId && userId === req.user._id.toString()) {
            const user = await User.findById(userId);
            if(user) {
                res.json({
                    message: 'user found',
                    user
                });
            } else {
                res.status(404).json({
                    message: 'no user found'
                });
            }
        } else {
            res.status(401).json({
                message: 'unauthorized to perform this request'
            }); 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });
    }
});




router.put('/:userId', isAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        if(userId && userId === req.user._id.toString()) {
            let user = await User.findById(userId);
            if(user) {
                if(validCreateOrUpdateUserRequest(req.body)) {
                    if(await userExists(req.body.username)) {
                        res.status(400).json({
                            message: 'username already used'
                        });
                    } else {
                        user.username = req.body.username;
                        user.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
                        await user.save();
    
                        res.json({
                            message: 'user updated successfully',
                            user
                        });
                    }

                } else {
                    res.status(400).json({
                        message: 'bad request'
                    });
                }
            } else {
                res.status(404).json({
                    message: 'no user found'
                }); 
            }
        } else {
            res.status(401).json({
                message: 'unauthorized to perfrom this request'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });
    }
});


router.delete('/:userId', isAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        if(userId && userId === req.user._id.toString()) {
            const user = await User.findByIdAndDelete(userId);
            if(user) {
                res.json({
                    message: 'user deleted successfully',
                    user
                });
            } else {
                res.status(404).json({
                    message: 'user not found',
                });
            }
        } else {
            res.status(404).json({
                message: 'unauthorized to perfrom this request'
            }); 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });
    }
})

module.exports = router;