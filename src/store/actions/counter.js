/*
 * @Author: dfh
 * @Date: 2021-03-09 10:53:39
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 10:55:33
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/store/actions/counter.js
 */
import { push } from 'connected-react-router';
import * as types from '../action-types';
const actions = {
    add() {
        return { type: types.ADD };
    },
    mimus() {
        return { types: types.MINUS };
    },
    go(path) {
        return push(path);
    }
}
export default actions