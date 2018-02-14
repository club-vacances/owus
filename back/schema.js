import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type User {
  id: Int
  firstName: String
  lastName: String
  picture: String
  transactions: [Transaction]
  friends: [User]
}
type Transaction {
  id: Int
  description: String
  amount: Int
  paidBy: User
  paidFor: [User]
}
type Query {
  user(id: Int!): User
}
type Mutation {
  createTransaction(description: String!, amount: Int!, paidBy: Int!, paidFor: [Int]!): Transaction
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
