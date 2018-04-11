import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'
// import createHistory from 'history/createBrowserHistory'

import {useStrict} from 'mobx';
import {Provider} from "mobx-react";

import stores from 'stores/';

import Application from 'containers/Application';

import 'styles/app.css';

useStrict(true);

ReactDOM.render( 
    <Provider {...stores}>
        <Router>
            <Application />
        </Router>
    </Provider>, document.getElementById('root'));