/*
 * @Author: dfh
 * @Date: 2021-03-09 13:42:17
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:11:40
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/connected-react-router/actions.js
 */
import * as types from './action-types';

/**
 * 路径变化的actionCreator
 * @param {*} location 
 * @param {*} action 
 * @returns 
 */
export function locationChange(location, action) {
    return {
        type: types.LOCATION_CHANGE,
        payload: {
            location,
            action
        }
    }
}

/**
 * 这是一个用来跳转路径的actionCreator
 * @param {*} path 要跳转的路径
 * @returns 返回一个跳转路径action
 */
export function push(path) {
    return {
        type: types.CALL_HISTORY_METHOD,//调用历史对象的方法
        payload: {//携带额外数据
            method: 'push',//push方法
            args: [path]
        }
    }
}