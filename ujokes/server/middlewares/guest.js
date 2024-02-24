module.exports = (req, res, next) => {
    if(req.session.user_id) return res.status(403).json({success: false, msg: "Forbidden"});
    
    next();
}