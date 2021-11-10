const User = require('../models/user');

let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },

    function(username, password, done) {
        User.findOne({ name: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPass(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});