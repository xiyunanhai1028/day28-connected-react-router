/*
 * @Author: dfh
 * @Date: 2021-03-09 13:42:28
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:12:58
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/connected-react-router/routerMiddleware.js
 */
import * as types from './action-types'

/** 引用中间件routerMiddlware能够识别这个action，进行路径跳转 */
function routerMiddleware(history) {
    //返回的是一个中间件
    return middlewareApi => next => action => {
        //如果不是要跳转的路径，那么直接一下步
        if (action.type !== types.CALL_HISTORY_METHOD) {
            return next(action);
        }
        const { payload: { method, args } } = action;
        history[method](...args);
    }
}
export default routerMiddleware;