import Sequelize from 'sequelize';
const db = new Sequelize('owus', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = db.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    picture: Sequelize.STRING
});

const Transaction = db.define('transaction', {
    description: Sequelize.STRING,
    amount: Sequelize.INTEGER
});

// paidBy
User.hasMany(Transaction, {as: 'Loan', foreignKey: 'lenderId'});
Transaction.belongsTo(User, {as: 'Lender', foreignKey: 'lenderId'});

// paidFor
User.belongsToMany(Transaction, {as: 'Debt', through: 'borrower_debts'})
Transaction.belongsToMany(User, {as: 'Borrower', through: 'borrower_debts'})

export { db, User, Transaction };