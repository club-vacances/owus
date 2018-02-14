import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

class AddTransaction extends Component {
  state = {
    description: '',
    amount: null,
    borrowers: [],
  };

  addTransaction = event => {
    event.preventDefault();
    let transaction = { ...this.state, lender: this.props.user.id };
    this.props.mutate({
      variables: transaction,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleBorrowerChange = ({ target }) => {
    let borrowerId = target.value;
    if (target.checked) {
      this.setState({
        borrowers: [borrowerId, ...this.state.borrowers],
      });
    } else {
      let index = this.state.borrowers.indexOf(borrowerId);
      let borrowers = [...this.state.borrowers];
      borrowers.splice(index, 1);
      this.setState({
        borrowers,
      });
    }
  };

  render() {
    let { loading, user } = this.props;

    if (!loading) {
      return (
        <form onSubmit={this.addTransaction}>
          <select name="lender" onChange={this.handleChange}>
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
            {user.friends.map(friend => (
              <option key={friend.id} value={friend.id}>
                {friend.firstName} {friend.lastName}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            onChange={this.handleChange}
            required
          />
          {[user, ...user.friends].map(borrower => (
            <div key={borrower.id}>
              <label>
                <input
                  type="checkbox"
                  value={borrower.id}
                  onChange={this.handleBorrowerChange}
                />
                {borrower.firstName} {borrower.lastName}
              </label>
            </div>
          ))}
          <button type="submit">Ajouter une dépense</button>
        </form>
      );
    }

    return <div>Loading</div>;
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
`;

export const createTransactionMutation = gql`
  mutation createTransaction(
    $lender: Int!
    $description: String!
    $amount: Int!
    $borrowers: [Int]!
  ) {
    createTransaction(
      lender: $lender
      description: $description
      amount: $amount
      borrowers: $borrowers
    ) {
      id
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default compose(
  graphql(appQuery, {
    options: ({ id }) => ({ variables: { id: 1 } }),
    props: ({ data }) => data,
  }),
  graphql(createTransactionMutation),
)(AddTransaction);
