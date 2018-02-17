import { Op } from 'sequelize';
import { db, User, Transaction } from './database';

const resolvers = {
  Query: {
    user: (r, args) => User.findById(1),
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

      const transaction = await lender.createLoan(args);
      await transaction.setBorrowers(borrowers);
    },
  },
  User: {
    transactions: user =>
      db.query(
        `SELECT DISTINCT transactions.*
        FROM transactions
        LEFT JOIN users as lender ON lender.id = transactions."lenderId"
        LEFT JOIN borrower_debts ON borrower_debts."transactionId" = transactions.id
        LEFT JOIN users as borrower ON borrower_debts."userId" = borrower.id
        WHERE borrower.id = :userId
        OR lender.id = :userId
        ORDER BY transactions."createdAt" DESC
        `,
        {
          replacements: { userId: user.id },
          model: Transaction,
          type: db.QueryTypes.SELECT,
        },
      ),
    friends: user => user.getFriends(),
  },
  Transaction: {
    lender: transaction => transaction.getLender(),
    borrowers: transaction => transaction.getBorrowers(),
  },
};

export default resolvers;
