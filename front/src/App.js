import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const App = () => {
  return (
    <div>
      <style>
        {`
        body {
          background-color: black;
          color: white;
        }
        `}
      </style>
      <AddTransaction/>
      <TransactionList/>
    </div>
  )
}

export default App;
