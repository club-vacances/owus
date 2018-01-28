import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Transaction from './Transaction';

const TransactionList = ({ data: { loading, user } }) => {
  if (loading) {
    return <div>Loading</div>
  }
  return (
    <div>
      Liste transactions
      <ul>
      {user.transactions.map(transaction => (
        <Transaction transaction={transaction}/>
      ))}
      </ul>
    </div>
  )
}

export const appQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      transactions {
        id
        description
        amount
        paidFor {
          id
          firstName
          lastName
        }
      }
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(appQuery, {
  options: ({ id }) => ({ variables: { id: 1 } })
})(TransactionList)
