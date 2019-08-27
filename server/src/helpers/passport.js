import passport from 'passport';
import facebookPassport from 'passport-facebook';
import dotenv from 'dotenv';

const FacebookStrategy = facebookPassport.Strategy;

dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8000/api/v1/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name', 'photos']
},
async (accessToken, refreshToken, profile, done) => {
  const user = profile;
  if(!profile.emails || !profile.emails.length){
    return done('No email with this account');
  }
  return done(null, user);
}));

export default passport;
