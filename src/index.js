import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import {useStrict} from 'mobx';
import {Provider} from "mobx-react";

import stores from './stores';

import App from 'containers/App';

import 'styles/app.css';

useStrict(true);

const history = createHistory();

ReactDOM.render( 
    <Provider {...stores}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));