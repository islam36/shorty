const router = require('express').Router();
const Link = require('../models/link');

router.get('/', (req, res) => {
    res.redirect('/main')
});

router.get('/:shortLink', async (req, res) => {
    try {
        const link = await Link.findOne({ shortLink: req.params.shortLink });
        if (link != null) {
            res.status(301).redirect(link.link);
        } else {
            res.status(404).json({
                message: 'link not found'
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'server error'
        })
    }
});


module.exports = router;