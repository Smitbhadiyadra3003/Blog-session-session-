    const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/bloglist');


passport.use(new LocalStrategy({

    usernameField: 'e_mail'

}, function (e_mail, password, done) {

    User.findOne({
        e_mail: e_mail
        
    }, function (err, user) {

        if (err) {
            console.log("email not found");
            return done(err);
        }
        // console.log("user infsdf="+user);

        if (!user || user.password != password) {

            console.log("password not match");
            return done(null, false);
        }

        console.log(user);
        return done(null, user);


    })

}));

passport.serializeUser(function (user, done) {

    return done(null, user.id);
});




passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user) {


        if (err) {

            console.log("user is not found");
            return done(null, false);
        }
        return done(null,user);
    })

})

passport.checkAuthentication=function(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser=function(req,res,next)
{

    // console.log("sdfs"+req.user);
    if(req.isAuthenticated()){

        res.locals.user =req.user;
    }
    return next();
}

module.exports = passport;