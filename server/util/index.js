const User = require('../models/user');
const crypto = require('crypto');
const Link = require('../models/link');


const SALT_ROUNDS = 10;
const MIN_LENGTH = 6;

function validCreateOrUpdateUserRequest(body) {
    return (body
        && body.username
        && body.password
        && typeof (body.username) === 'string'
        && body.username.length >= 0
        && typeof (body.password) === 'string'
        && body.password.length >= MIN_LENGTH);
}

async function userExists(username) {
    try {
        const user = await User.findOne({ username });
        return (user != null);
    } catch (err) {
        console.log(err);
    }
}

function validCreateOrUpdateLinkRequest(body) {
    const linkRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    return ( body
        && body.link
        && body.title
        && typeof (body.link) === 'string'
        && typeof (body.title) === 'string'
        && linkRegex.test(body.link)
        && body.title.length > 0
    );
}


async function randomShortLink() {
    const SIZE = 4;

    let string = crypto.randomBytes(SIZE).toString('hex');
    let exists = await Link.findOne({ shortLink: string });

    while(exists != null) {
        string = crypto.randomBytes(SIZE).toString('hex');
        exists = await Link.findOne({ shortLink: string });     
    }

    return string;
}

module.exports = {
    MIN_LENGTH,
    SALT_ROUNDS,
    validCreateOrUpdateUserRequest,
    validCreateOrUpdateLinkRequest,
    userExists,
    randomShortLink
}