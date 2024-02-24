const redis = require("../redis");
const {v4} = require("uuid");
require("dotenv").config();

module.exports = confirmationUrl = async user_id => {
    try {
        const token = v4();
        await redis.set(process.env.CONFIRMATION_EMAIL_PREFIX + token, user_id, "ex", 1000 * 60 * 60 * 24 * 3);
        return `http://localhost:3000/confirm-email/${token}`;
    } catch (err) {
        console.error(err.message);
    }
};