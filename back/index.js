/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import schema from './schema';
import { db, User } from './database';
/* eslint-enable no-alert, no-console */

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/facebook/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
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
        .then(user => done(null, user))
        .catch(err => done(err));
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const start = async () => {
  await db.sync();
  const app = express();
  app.use(cors());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: 'http://localhost:3000',
      failureRedirect: '/login',
    }),
  );

  app.listen(4000, () =>
    console.log('Now browse to http://localhost:4000/graphiql'),
  );
};

start();
