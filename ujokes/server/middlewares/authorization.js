module.exports = (req, res, next) => {
    if(!req.session.user_id) return res.status(401).json({success: false, msg: "Unauthorized"});

    next();
}