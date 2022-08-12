const express = require('express');

const cookieParser = require('cookie-parser');

const port = process.env.PORT;

const server = express();

const path = require('path');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

const session = require('express-session');

const passport = require('passport');

const LocalStrategy = require('./config/passport-local-start');

const flash = require('connect-flash');

const middlewareFlash = require('./config/middlewareFlash');

server.use(cookieParser());
server.use(express.urlencoded());
server.use(express.static('assets'));
const db = require('./config/mongoose');
server.use(session({
    name: "code",
    secret: "blog world",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 100)
    }


}));

server.use(passport.initialize());
server.use(passport.session());

server.use(passport.setAuthenticatedUser);

server.use(flash());
server.use(middlewareFlash.setFlash);

server.use('/', require('./routes/blog'));
server.use('/avatars', express.static(__dirname + '/avatars'));

server.listen(port, function (err) {
    if (err) {

        console('server not cerated');
        return false;
    }

    console.log("server cerated:-" + port);

})