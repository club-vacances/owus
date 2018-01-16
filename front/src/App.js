import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import logo from './logo.svg';
import './App.css';

const App = ({ data: { user } }) => {
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  )
}

export const appQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(appQuery, {
  options: ({ id }) => ({ variables: { id: 1 } })
})(App)
