import { User, Transaction } from './database';
import { Op } from 'sequelize';

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
      const lender = await User.findById(args.lender);
      const borrowers = await User.findAll({
        where: {
          id: {
            [Op.in]: args.borrowers,
          },
        },
      });
      console.log(borrowers);

      let transaction = await lender.createLoan(args);
      await transaction.setBorrowers(borrowers);
      console.log(transaction);
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
    lender: transaction => ({
      id: 1,
      firstName: 'Roger',
      lastName: 'Maloutou',
      picture: 'http://placehold.it/430x430',
    }),
    borrowers: transaction => [
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
