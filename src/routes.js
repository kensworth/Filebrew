// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import Receive from './components/Receive';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} />
        <Route path="/:magnet" component={Receive} />
    </Router>
);

export default Routes;
