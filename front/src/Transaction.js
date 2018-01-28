import React, {Component} from 'react';

const Transaction = ({transaction}) => {
  return (
    <li key={transaction.id}>
        {transaction.description}
        -
        {transaction.amount} centimes d'euro
        -
        for&nbsp;
        {transaction.paidFor.map(user => (
            <span>{user.firstName}&nbsp;</span>
        ))}
    </li>
  );
};

export default Transaction;