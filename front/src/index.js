import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Apollo from './Apollo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Apollo />, document.getElementById('root'));
registerServiceWorker();
