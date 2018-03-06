import React from 'react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
      <Router>
        <div>
          <ul>
            <li><a href="http://localhost:4000/auth/facebook">Login</a></li>
            <li><Link to="/transactions">History</Link></li>
            <li><Link to="/add-transaction">Add transaction</Link></li>
          </ul>

          <hr />

          <Route exact path="/transactions" component={TransactionList} />
          <Route exact path="/add-transaction" component={AddTransaction} />
        </div>
      </Router>
    </div>
  );
};

export default App;
