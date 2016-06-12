import './styles';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from './App';

// remove ?_k= param from hashHistory
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render((
  <Router history={appHistory}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('app'));
