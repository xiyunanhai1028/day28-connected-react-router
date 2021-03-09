/*
 * @Author: dfh
 * @Date: 2021-03-09 11:01:39
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:14:51
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/store/index.js
 */
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from '../connected-react-router';
import history from '../history';
import reducers from './reducers';
export default applyMiddleware(routerMiddleware(history))(createStore)(reducers);