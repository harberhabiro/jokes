const router = require("express").Router();
const pool = require("../../db");
require("dotenv").config();
const argon2 = require("argon2");
const guest = require("../../middlewares/guest");
const { body, validationResult } = require("express-validator");
const badWords = require("../../middlewares/badWords");
const confirmationUrl = require("../../utils/confirmationUrl");
const sendEmail = require("../../utils/sendEmail");

//sign up aka register
router.post("/register", guest, badWords,
  body('name').trim().escape().isLength({min: 3, max: 20}).withMessage("Username must be between 3-20 chararcters long"),
  body("email").trim().escape().isEmail().withMessage("Not a valid email address"),
  body("password").trim().escape().isLength({max: 1000}).isStrongPassword().withMessage("Password must be at least 8 characters long, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol"),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Both passwords don't match up. Make sure both passwords match");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  async (req, res) => {
    //errors from the validator
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(401).json({success: false, msg: errors.array()});

    try {
        //check if user has done the captcha
        if(!req.body.captcha) return res.status(401).json({success: false, msg: "Please select the checkbox"});

        //check if capatcha is true
        const body = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPATCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.ip}`).then(res => res.json());

        if (body.success !== undefined && !body.success) return res.json({ success: false, msg: 'Failed captcha verification' });

        //check if the user exists, if so send an error
        const user = await pool.query("SELECT user_email FROM users WHERE user_email = $1", [
            req.body.email
        ]);

        if(user.rows.length > 0) return res.status(401).json({success: false, msg: "Invalid register"});

        //check if username exists
        const username = await pool.query("SELECT user_name FROM users WHERE user_name = $1", [
            req.body.name
        ]);

        if(username.rows.length > 0) return res.status(401).json({success: false, msg: "Username is taken"});

        //hash the pass
        const hashP = await argon2.hash(req.body.password);

        //put the info in the database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [
            req.body.name, req.body.email, hashP
        ]);

        //cookie/session

        //send verification email
        const url = await confirmationUrl(newUser.rows[0].user_id);

        await sendEmail(newUser.rows[0].user_email, "Verify email",
            `<a href="${url}">Confirm email</a>`);

        //insert log info
        await pool.query("INSERT INTO logs (user_id, type, user_agent, ip_address) VALUES ($1, $2, $3, $4)", [
            newUser.rows[0].user_id, 'register', req.headers['user-agent'], req.ip
        ]);

        return res.status(200).json({success: true, msg: "Please verify your email. Before entering you must verify your email and be approved by a mod"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, msg: "Server error"});
    }
});







//login
router.post('/login', 
     body("email").trim().escape().isEmail().withMessage("Email or password is incorrect"), 
     body("password").trim().escape().isLength({min: 8, max: 1000}).withMessage("Email or password is incorrect"), 
    async (req, res) => {
        //errors from the validator
        const errors = validationResult(req);

        if(!errors.isEmpty()) return res.status(401).json({success: false, msg: errors.array()});

    try {
        //captcha
        //check if user has done the captcha
        // if(!req.body.captcha) return res.status(401).json({success: false, msg: "Please select the checkbox"});

        // //check if capatcha is true
        // const body = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPATCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.ip}`).then(res => res.json());

        // if (body.success !== undefined && !body.success) return res.json({ success: false, msg: 'Failed captcha verification' });

        //check if user is soft deleted or not, if soft deleted the user account type will be changed to normal

        

        //check if user exists, if no existence, then send an error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            req.body.email
        ]);

        if(user.rows.length <= 0) return res.status(401).json({success: false, msg: "Email or password is incorrect"});

        //check if banned
        if(user.rows[0].user_type == 5) return res.status(401).json({success: false, msg: "Your are banned"});

        //check if verified, if not send errror
        if(user.rows[0].user_confirm === false) return res.status(401).json({success: false, msg: "Please verify your email. Not allowed in until verification."})
        
        //check if approved, if not send error
        if(user.rows[0].user_approved === false) return res.status(401).json({success: false, msg: "Please be patient. Your account must be approved by a mod to enter app"});

        //check if the password is correct
        const verifyP = await argon2.verify(user.rows[0].user_password, req.body.password);

        if(!verifyP) return res.status(401).json({success: false, msg: "Email or password is incorrect"});

        //authenticate user
        req.session.user_id = user.rows[0].user_id;
        
        //log info
        await pool.query("INSERT INTO logs (user_id, type, user_agent, ip_address) VALUES ($1, $2, $3, $4)", [
            req.session.user_id, 'login', req.headers['user-agent'], req.ip
        ]);

        res.status(200).json({success: true, msg: "Logged in"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, msg: "Server error"});
    }
});

//logout
router.post("/logout", async (req, res) => {
    try {
        req.session.destroy(err => {
            if(err) throw err;

            res.clearCookie(process.env.APP_NAME);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, msg: "Server error"});
    }
});

module.exports = router;