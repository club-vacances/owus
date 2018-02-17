import Sequelize from 'sequelize';

const db = new Sequelize('owus', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  picture: Sequelize.STRING,
  facebookId: Sequelize.STRING,
});

const Transaction = db.define('transaction', {
  description: Sequelize.STRING,
  amount: Sequelize.INTEGER,
});

User.hasMany(Transaction, { as: 'Loans', foreignKey: 'lenderId' });
Transaction.belongsTo(User, { as: 'Lender', foreignKey: 'lenderId' });

User.belongsToMany(Transaction, { as: 'Debts', through: 'borrower_debts' });
Transaction.belongsToMany(User, { as: 'Borrowers', through: 'borrower_debts' });

User.belongsToMany(User, { as: 'Friends', through: 'friends' });

export { db, User, Transaction };
