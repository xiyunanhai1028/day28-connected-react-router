/*
 * @Author: dfh
 * @Date: 2021-03-09 10:42:16
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 11:08:33
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/components/Home.js
 */
import React from 'react';

class Home extends React.Component {
    render() {
        return <div>
            <h1>Home</h1>
            <button onClick={() => this.props.history.go(-1)}>返回</button>
        </div>
    }
}
export default Home;