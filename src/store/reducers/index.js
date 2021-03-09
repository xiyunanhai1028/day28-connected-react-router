/*
 * @Author: dfh
 * @Date: 2021-03-09 10:51:20
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:15:01
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/store/reducers/index.js
 */
import { combineReducers } from 'redux';
import { connectRouter } from '../../connected-react-router';
import counter from './counter';
import history from '../../history';

const reducers = {
    router: connectRouter(history),
    counter
}
export default combineReducers(reducers);