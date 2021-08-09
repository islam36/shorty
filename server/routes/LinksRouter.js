const router = require('express').Router();
const Link = require('../models/link');
const isAuth = require('../middleware/isAuth');
const {
    validCreateOrUpdateLinkRequest,
    randomShortLink
} = require('../util');

router.get('/', isAuth, async (req, res) => {
    try {
        if(req.query) {
            let { page, limit } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);

            if(page == null || (typeof page === 'number' && page < 1)) {
                page = 0;
            }

            if(limit == null || (typeof limit === 'number' && limit < 1)) {
                limit = Number.MAX_SAFE_INTEGER;
            }

            const links = await Link.find({ userId: req.user._id})
                .limit(limit)
                .skip(page * limit)
                .exec();

            if(links != null && links.length > 0) {
                res.json({
                    message: 'links found',
                    links
                });
            } else {
                res.json({
                    message: 'currently, you have no links',
                    links: []
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });
    }
});




router.post('/', isAuth, async (req, res) => {
    try {
        if(validCreateOrUpdateLinkRequest(req.body)) {
            let shortLink = await randomShortLink();

            const link = new Link({
                link: req.body.link,
                shortLink,
                userId: req.user._id,
                title: req.body.title
            });

            await link.save();

            res.status(201).json({
                message: 'new link created successfully',
                link
            });
        } else {
            res.status(400).json({
                message: 'bad request'
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        });  
    }
});


router.get('/:linkId', isAuth, async (req, res) => {
    try {
        const { linkId } = req.params;
        if(linkId != null) {
            const link = await Link.findById(linkId);
            if(link) {
                if(link.userId.toString() === req.user._id.toString()) {
                    res.json({
                        message: 'link found',
                        link
                    });
                } else {
                    res.status(401).json({
                        message: "you don't have permission to access this link"
                    });
                }
            } else {
                res.status(404).json({
                    message: 'no link found',
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


router.put('/:linkId', isAuth, async (req, res) => {
    try {
        const { linkId } = req.params;
        if(linkId != null) {
            if(validCreateOrUpdateLinkRequest(req.body)) {
                const link = await Link.findById(linkId)
                if(link != null) {

                    if(link.userId.toString() === req.user._id.toString()) {
                        link.link = req.body.link;
                        link.title = req.body.title;
                        await link.save();
    
                        res.json({
                            message: 'link updated succefully',
                            link
                        });
                    } else {
                        res.status(401).json({
                            message: "you don't have permission to edit this link"
                        });    
                    }
                } else {
                    res.status(404).json({
                        message: 'no link found'
                    });
                }
            } else {
                res.status(400).json({
                    message: 'bad request'
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


router.delete('/:linkId', isAuth, async (req, res) => {
    try {
        const { linkId } = req.params;
        if(linkId != null) {
            const link = await Link.findById(linkId);
            if(link != null) {
                if(link.userId.toString() === req.user._id.toString()) {
                    await link.remove();

                    res.json({
                        message: 'link deleted successfully',
                        link
                    });
                } else {
                    res.status(401).json({
                        message: "you don't have permission to delete this link"
                    })
                }
            } else {
                res.status(404).json({
                    message: 'no link found'
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