import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class AddTransaction extends Component {
  state = {
    description: '',
    amount: null,
    paidFor: []
  };

  addTransaction = (event) => {
    event.preventDefault();
    let transaction = {...this.state, paidBy: this.props.user.id};
    this.props.mutate({
      variables: transaction
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    let {loading, user} = this.props;

    if (!loading) {
      return (
        <form onSubmit={this.addTransaction}>
          <select name="paidBy" onChange={this.handleChange}>
            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            { user.friends.map(friend => (
              <option key={friend.id} value={friend.id}>{friend.firstName} {friend.lastName}</option>
            ))}
          </select>
          <input type="text" name="description" onChange={this.handleChange} required/>
          <input type="number" name="amount" onChange={this.handleChange} required/>
          <select name="paidFor" onChange={this.handleChange} multiple>
            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            { user.friends.map(friend => (
              <option key={friend.id} value={friend.id}>{friend.firstName} {friend.lastName}</option>
            ))}
          </select>
          <button type="submit">Ajouter une dépense</button>
        </form>
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
  mutation createTransaction($paidBy: Int!, $description: String!, $amount: Int!, $paidFor: [Int]!) {
    createTransaction(paidBy: $paidBy, description: $description, amount: $amount, paidFor: $paidFor) {
      id
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default compose(
  graphql(appQuery, {
    options: ({ id }) => ({ variables: { id: 1 } }),
    props: ({ data }) => data
  }),
  graphql(createTransactionMutation)
)(AddTransaction)
