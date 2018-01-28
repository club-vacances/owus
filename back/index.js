import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
import mongoose from 'mongoose'
import User from './models/User'

//TODO : use dotenv
mongoose.connect('mongodb://localhost/owus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var app = express()
  app.use(cors())
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  app.listen(4000, () =>
    console.log('Now browse to http://localhost:4000/graphiql')
  )
  let roger = new User({
    id: 1,
    firstName: "Roger",
    lastName: "Maloutou",
    picture: "http://placehold.it/430x430"
  })
  roger.save()
});


