import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class AddTransaction extends Component {
  addTransaction(event) {
    console.log(event);
  }

  render() {
    let {loading, user} = this.props.data;

    if (!this.props.data.loading) {
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
          <select name="paidFor" multiple>
            <option value={user.id}>{user.firstName} {user.lastName}</option>
            { user.friends.map(friend => (
              <option value={friend.id}>{friend.firstName} {friend.lastName}</option>
            ))}
          </select>
          <button type="submit" onClick={this.addTransaction}>Ajouter une dépense</button>
        </div>
      )
    }

    return (
      <div>Loading</div>
    )
  }
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

export const createTransactionMutation = gql`
  mutation createTransaction($paidBy: User!, $description: String!, $amount: Int!, $paidFor: [User]!) {
    createTransaction(paidBy: $paidBy, description: $description, amount: $amount, paidFor: $paidFor)
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(appQuery, {
  options: ({ id }) => ({ variables: { id: 1 } })
})(AddTransaction)
