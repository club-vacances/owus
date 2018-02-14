import { User, Transaction } from './database';

const resolvers = {
  Query: {
    user: (r, args) => ({
      id: 1,
      firstName: 'Roger',
      lastName: 'Maloutou',
      picture: 'http://placehold.it/430x430',
    }),
  },
  Mutation: {
    createTransaction: async (r, args) => {
      console.log(r, args);

      const lender = await User.findById(args.paidBy);
      const transaction = { ...args };

      console.log(transaction);

      let transaction2 = await lender.createLoan(transaction);

      console.log(transaction2.get());
    },
  },
  User: {
    transactions: user => [
      {
        id: 1,
        description: 'Macdo',
        amount: 1000,
      },
      {
        id: 2,
        description: 'Location ski',
        amount: 39000,
      },
    ],
    friends: user => [
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        picture: 'http://placehold.it/430x430',
      },
      {
        id: 3,
        firstName: 'Jack',
        lastName: 'Daniels',
        picture: 'http://placehold.it/430x430',
      },
      {
        id: 4,
        firstName: 'Big',
        lastName: 'Shaq',
        picture: 'http://placehold.it/430x430',
      },
    ],
  },
  Transaction: {
    paidBy: transaction => ({
      id: 1,
      firstName: 'Roger',
      lastName: 'Maloutou',
      picture: 'http://placehold.it/430x430',
    }),
    paidFor: transaction => [
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        picture: 'http://placehold.it/430x430',
      },
      {
        id: 3,
        firstName: 'Jack',
        lastName: 'Daniels',
        picture: 'http://placehold.it/430x430',
      },
    ],
  },
};

export default resolvers;
