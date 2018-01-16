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
    friends: user => [
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        picture: "http://placehold.it/430x430"
      },
      {
        id: 3,
        firstName: "Jack",
        lastName: "Daniels",
        picture: "http://placehold.it/430x430"
      },
      {
        id: 4,
        firstName: "Big",
        lastName: "Shaq",
        picture: "http://placehold.it/430x430"
      }
    ]
  },
  Transaction: {
    paidBy: transaction => ({}),
    paidFor: transaction => []
  }
}

export default resolvers
