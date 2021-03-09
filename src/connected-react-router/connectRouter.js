/*
 * @Author: dfh
 * @Date: 2021-03-09 13:42:56
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:05:34
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/connected-react-router/connectRouter.js
 */
import * as types from './action-types'
/** 引入connectRouter，此时reducer能够识别这种action，把这种action里面对应的路径信息保存到store里 */

/**
 * 给reducers添加一个可以识别路径变化的reducer
 * @param {*} history 
 * @returns 返回的是一个reducer
 */
function connectRouter(history) {
    const initialState = {
        location: history.location,
        action: history.action
    }
    return (state = initialState, action) => {
        switch (action.type) {
            case types.LOCATION_CHANGE:
                return { ...state, ...action.payload }
            default:
                return state;
        }
    }
}
export default connectRouter;