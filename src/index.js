/*
 * @Author: dfh
 * @Date: 2021-03-09 10:37:28
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 11:20:22
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import store from './store';
import Home from './components/Home';
import Counter from './components/Counter';
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <>
            <Link to='/' >Home</Link> |
            <Link to='/counter'>Counter</Link>
            <Route path='/' exact component={Home} />
            <Route path='/counter' exact component={Counter} />
        </>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));