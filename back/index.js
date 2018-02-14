import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import { db, User } from './database';

var app = express()
app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(4000, () =>
  console.log('Now browse to http://localhost:4000/graphiql')
)

db.sync().then(() => {
  User.create({
    firstName: "Roger",
    lastName: "Maloutou",
    picture: "http://placehold.it/430x430"
  });
  User.create({
    firstName: "Jane",
    lastName: "Doe",
    picture: "http://placehold.it/430x430"
  });
  User.create({
    firstName: "Jack",
    lastName: "Daniels",
    picture: "http://placehold.it/430x430"
  });
  User.create({
    firstName: "Big",
    lastName: "Shaq",
    picture: "http://placehold.it/430x430"
  });
});