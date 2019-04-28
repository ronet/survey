module.exports = (app) => {
  const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
  // ,
  // GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  const userSchema = app.get('mongoose').user;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serializeUser : ', user);
    done(null, user.email);
  });

  passport.deserializeUser((id, done) => {
    userSchema.findById(id, (err, user) => {
      console.log('deserializeUser : ', user);
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pw'
  }, async (username, password, done) => {
    console.log('000000');
    await userSchema.findOne({ email: username }, function (err, user) {
      if (err) {
        console.log('11111');
        return done(err);
      }
      if (!user) {
        console.log("22222");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log("33333");
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("44444");
      return done(null, user);
    });
  }
  ))

  app.set('passport', passport);

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  // passport.use(new GoogleStrategy({
  //     clientID: GOOGLE_CLIENT_ID,
  //     clientSecret: GOOGLE_CLIENT_SECRET,
  //     callbackURL: "http://www.example.com/auth/google/callback"
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //        User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //          return done(err, user);
  //        });
  //   }
  // ));
}