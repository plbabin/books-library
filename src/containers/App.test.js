import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'mobx-react';
import stores from 'stores/';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider {...stores}>
    <Router><App /></Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
