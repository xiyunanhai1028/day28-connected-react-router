## connected-react-router

### 1.项目依赖

```javascript
npm install redux react-redux react-router-dom connected-react-router -S
```

### 2.使用

![基本使用](https://tva1.sinaimg.cn/large/008eGmZEly1godhq8ypr3g30gk0hswpl.gif)

#### 2.1.`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import store from './store';
import Home from './components/Home';
import Counter from './components/Counter';
ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <>
            <Link to='/' >Home</Link> |
            <Link to='/counter'>Counter</Link>
            <Route path='/' exact component={Home} />
            <Route path='/counter' exact component={Counter} />
        </>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
```

#### 2.2.`components/Home.js`

```javascript
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
```

#### 2.3.`components/Counter.js`

```javascript
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
```

#### 2.4.`src/history.js`

```javascript
import {createBrowserHistory} from 'history';
export default createBrowserHistory();
```

#### 2.5.`store/index.js`

```javascript
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import history from '../history';
import reducers from './reducers';
export default applyMiddleware(routerMiddleware(history))(createStore)(reducers);
```

#### 2.6.`store/action-types.js`

```javascript
const ADD = 'ADD';
const MINUS = 'MINUS';

export {
    ADD,
    MINUS
}
```

#### 2.7.`store/actions/counter.js`

```javascript
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
```

#### 2.8.`store/reducers/index.js`

```javascript
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import history from '../../history';

const reducers = {
    router: connectRouter(history),
    counter
}
export default combineReducers(reducers);
```

#### 2.9.`store/reducers/counter.js`

```javascript
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
```

### 3.实现

```javascript
connected-react-router
├── ConnectedRouter.js
├── action-types.js
├── actions.js
├── connectRouter.js
├── index.js
└── routerMiddleware.js
```

#### 3.1.`index.js`

```javascript
export {default as ConnectedRouter} from './ConnectedRouter';
export {default as connectRouter} from './connectRouter';
export {default as routerMiddleware} from './routerMiddleware';
```

#### 3.2.`ConnectedRouter.js`

```javascript
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
```

#### 3.3.`action-types.js`

```javascript
/** 调用历史对象上的方法 */
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
/** 向仓库派发动作，请求修改路径信息 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
```

#### 3.4.`actions.js`

```javascript
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
```

#### 3.5.`routerMiddleware.js`

```javascript
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
```

#### 3.6.`connectRouter.js`

```javascript
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
```

