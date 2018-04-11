import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'mobx-react';
import stores from 'stores/';

import Application from './Application';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider {...stores}>
    <Router>
      <Application />
    </Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
