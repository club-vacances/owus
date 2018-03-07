import passport from 'passport';
import { Strategy } from 'passport-facebook';
import { User } from './database';

const setupPassport = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/facebook/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        const [firstName, lastName] = profile.displayName.split(' ', 2);
        const defaultUser = {
          facebookId: profile.id,
          firstName,
          lastName,
        };
        User.findOrCreate({
          where: { facebookId: profile.id },
          defaults: defaultUser,
        })
          .then(user => {
            done(null, user[0])
          })
          .catch(err => done(err));
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    done(null, user);
  });

  return passport;
}

export default setupPassport;