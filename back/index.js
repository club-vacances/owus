/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import { db } from './database';
import setupPassport from './auth';
/* eslint-enable no-alert, no-console */

const start = async () => {
  let passport = setupPassport();
  await db.sync();
  const app = express();
  app.use(cors({
    origin: /localhost.+(3000|4000)/,
    credentials: true
  }));
  app.use(session({
    secret: 'keyboard cat'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.all(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      context: { user: req.user }
    }))
  );
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: 'http://localhost:3000/transactions',
      failureRedirect: 'http://localhost:3000/',
    }),
  );
  app.listen(4000, () =>
    console.log('Now browse to http://localhost:4000/graphiql'),
  );
};

start();
