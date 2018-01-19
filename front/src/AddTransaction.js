import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paidBy: '1',
      description: 'Yolo',
      amount: 10,
      paidFor: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultipleSelectChange = this.handleMultipleSelectChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log('new value is '+value);
    this.setState({
      [name]: value
    });
  }

  handleMultipleSelectChange(event) {
    const target = event.target;
    const name = target.name;
    let values = [...event.target.options]
                  .filter(option => option.selected)
                  .map(option => option.value);
    this.setState({
      [name]: values
    });
  }

  render() {
    const { data: { loading, user } } = this.props;
    
    if (!loading) {    
      return (
        <div>
          <select name="paidBy"
                  value={this.state.paidBy}
                  onChange={this.handleInputChange}
          >
            <option key={user.id}
                    value={user.id}
            >
              {user.firstName} {user.lastName}
            </option>
            { user.friends.map(friend => (
              <option value={friend.id}
                      key={friend.id}
              >
                {friend.firstName} {friend.lastName}
              </option>
            ))}
          </select>
          <input type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  required
          />
          <input type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                  required
          />
          <select name="paidFor"
                  value={this.state.paidFor}
                  onChange={this.handleMultipleSelectChange}
                  multiple
          >
            <option key={user.id}
                    value={user.id}
            >
              {user.firstName} {user.lastName}
            </option>
            { user.friends.map(friend => (
              <option value={friend.id}
                      key={friend.id}
              >
                {friend.firstName} {friend.lastName}
              </option>
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
