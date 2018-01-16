const resolvers = {
  Query: {
    user: (r, args) => ({
        id: 1,
        firstName: "Roger",
        lastName: "Maloutou",
        picture: "http://placehold.it/430x430"
    })
  },
  Mutation: {
    createTransaction: (r, args) => ({})
  },
  User: {
    transactions: user => [],
    friends: user => []
  },
  Transaction: {
    paidBy: transaction => ({}),
    paidFor: transaction => []
  }
}

export default resolvers
