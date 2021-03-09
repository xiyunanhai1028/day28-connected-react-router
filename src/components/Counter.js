/*
 * @Author: dfh
 * @Date: 2021-03-09 11:03:44
 * @LastEditors: dfh
 * @LastEditTime: 2021-03-09 11:06:40
 * @Modified By: dfh
 * @FilePath: /day28-connected-react-router/src/components/Counter.js
 */
import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';

class Counter extends React.Component {
    render() {
        return <div>
            <p>{this.props.num}</p>
            <button onClick={this.props.add}>+</button>
            <button onClick={this.props.minus}>-</button>
            <button onClick={() => this.props.go('/')}>go home</button>
        </div>
    }
}

const mapStateToProps = state => state.counter;
export default connect(mapStateToProps, actions)(Counter);