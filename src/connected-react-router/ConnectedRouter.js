/*
 * @Author: dfh
 * @Date: 2021-03-09 13:42:42
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 14:22:29
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/connected-react-router/ConnectedRouter.js
 */
import React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { locationChange } from './actions'

class ConnectedRouter extends React.Component {

    componentDidMount() {
        //dispatch是connect链接时候的默认值
        const { history, dispatch } = this.props
        history.listen((location, action) => {
            //获取路径变化的Action
            const newAction = locationChange(location, action);
            dispatch(newAction);
        })
    }

    render() {
        const { history, children } = this.props
        return <Router history={history}>
            {children}
        </Router>
    }
}
export default connect()(ConnectedRouter);