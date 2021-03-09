/*
 * @Author: dfh
 * @Date: 2021-03-09 10:44:11
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 10:46:04
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/store/reducers/counter.js
 */
import * as types from '../action-types';
const initialState = { num: 0 };
function reduer(state = initialState, action) {
    switch (action.type) {
        case types.ADD:
            return { num: state.num + 1 }
        case types.MINUS:
            return { num: state.num - 1 }
        default:
            return state
    }
}
export default reduer;