module.exports = (req, res, next) => {
    const checkProfane = new RegExp("((p\\s*[^]*i*\\s*[^]*g\\s*[^]*f\\s*[^]*u\\s*[^]*c\\s*[^]*k\\s*[^]*e\\s*[^]*r)|(n\\s*[^]*i*\\s*[^]*g\\s*[^]*g\\s*[^]*e\\s*[^]*r)|(t\\s*[^]*o*\\s*[^]*w\\s*[^]*e*\\s*[^]*l\\s*[^]*h\\s*[^]*e*\\s*[^]*a\\s*[^]*d)|(g\\s*[^]*o*\\s*[^]*a*\\s*[^]*t\\s*[^]*f\\s*[^]*u\\s*[^]*c\\s*[^]*k\\s*[^]*e\\s*[^]*r))", "gi");
    if(req.path === "/register") {
        if(checkProfane.test(req.body.name) === true) return res.status(401).json({success: false, msg: "Username must not have racists terms"});
    } else if(req.path === "/post" || "/change-bio") {
        if(checkProfane.test(req.body.description) === true) return res.status(401).json({success: false, msg: "Username must not have racists terms"});
    }

    next();
};