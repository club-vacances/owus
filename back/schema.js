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
  lender: User
  borrowers: [User]
}
type Query {
  user(id: Int!): User
}
type Mutation {
  createTransaction(description: String!, amount: Int!, lender: Int!, borrowers: [Int]!): Transaction
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
