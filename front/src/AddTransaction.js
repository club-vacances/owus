import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const AddTransaction = () => {
  return (
    <div>
      Ajout de transaction
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
})(AddTransaction)
