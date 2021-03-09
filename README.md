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

