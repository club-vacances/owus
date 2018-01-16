import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const AddTransaction = ({data: {loading, user}}) => {
  if (!loading) {
    return (
      <div>
        <select name="paidBy">
          <option value={user.id}>{user.firstName} {user.lastName}</option>
          { user.friends.map(friend => (
            <option value={friend.id}>{friend.firstName} {friend.lastName}</option>
          ))}
        </select>
        <input type="text" required/>
        <input type="number" required/>
        <select name="paidFor">
          <option value={user.id}>{user.firstName} {user.lastName}</option>
          { user.friends.map(friend => (
            <option value={friend.id}>{friend.firstName} {friend.lastName}</option>
          ))}
        </select>
        <button type="submit">Ajouter une dépense</button>
      </div>
    )
  }

  return (
    <div>Loading</div>
  )
}

export const appQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      friends {
        id
        firstName
        lastName
      }
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(appQuery, {
  options: ({ id }) => ({ variables: { id: 1 } })
})(AddTransaction)
