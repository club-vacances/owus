import React, { Component } from 'react';

const Transaction = ({ transaction }) => {
  return (
    <li>
      {transaction.description}
      -
      {transaction.amount} centimes d'euro - for&nbsp;
      {transaction.borrowers.map(user => (
        <span key={user.id}>{user.firstName}&nbsp;</span>
      ))}
    </li>
  );
};

export default Transaction;
