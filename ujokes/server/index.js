const express = require("express");
const cors = require('cors');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require('./redis');
const helmet = require("helmet");
require("dotenv").config();
const app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(session({
    store: new RedisStore({ client: redis }),
    name: process.env.APP_NAME,
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
        secure: false,
        sameSite: false
    }
}));

//routes
app.use("/account/auth", require("./routes/account/auth"));

//server
app.listen(process.env.APP_PORT, () => console.log(`Server is on PORT:${process.env.APP_PORT}`));