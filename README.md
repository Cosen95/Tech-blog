# tech-blog

## 基于react构建的博客

### 项目依赖

#### react生命周期
**定义**

生命周期函数指在某一个时刻组件会自动调用执行的函数
**Initialization**

 - 进行props和state的初始化

**Mounting:**

> componentWillMount ---> render ---> componentDidMount

 - **render**:当组件的state或者props发生改变的时候，render函数就会重新执行
 - **componentWillMount**:在组件即将被挂载到页面的时刻自动执行
 - **componentDidMount**:组件被挂载到页面之后，自动执行

**Updation**

> **props:**componentWillReceiveProps ---> shouldComponentUpdate(为true继续执行，为false停止向下执行) ---> componentWillUpdate ---> render ---> componentDidUpdate
**state:**shouldComponentUpdate(为true继续执行，为false停止向下执行) ---> componentWillUpdate ---> render ---> componentDidUpdate

 - **shouldComponentUpdate**:组件更新之前，会自动被执行
 - **componentWillUpdate** :组件更新之前，会自动被执行，但他是在shouldComponentUpdate之后执行。如果shouldComponentUpdate返回true才执行，返回false则不会被执行。
 - **componentDidUpdate**:组件更新之后，会自动被执行
 - **componentWillReceiveProps**:执行应满足的条件1.组件要从父组件接受参数2.这个子组件第一次存在于父组件中，不会执行3.这个子组件之前已经存在于父组件中，才会执行。

**UnMounting**

 - **componentWillUnmount**:组件即将从页面中卸载时执行

#### React Developer Tools安装及使用
React Developer Tools 是一款由 facebook 开发的有用的 Chrome浏览器扩展。通过它我们可以查看应用程序的 React 组件分层结构。
点击 Chrome 的“菜单”->“更多工具”->“扩展程序”安装插件即可

#### PropTypes与DefaultProps
##### 使用 PropTypes 进行类型检查
React 有一些内置的类型检查功能。要检查组件的属性，你需要配置特殊的 propTypes 属性：
```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};

```
PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。在这个示例中，我们使用PropTypes.string。当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，propTypes 只在开发模式下进行检查。

##### 属性默认值defaultProps
你可以通过配置 defaultProps 为 props定义默认值：
```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);

```
defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。

#### Fragment
React还提供了一个组件，用于在没有外层父元素包裹的情况下渲染多个元素:
```
import { Component, Fragment }from 'react';

class Greeting extends Component {
  render() {
    return (
        <Fragment>
          <img src="" alt="">
          <p>How are you?</p>
          <h1>Hello, world</h1>
        </Fragment>
    );
  }
}

```

#### 虚拟DOM
**原生实现**
* state数据
* JSX模板
* 数据+模板结合，生成真实的DOM，来显示
* state发生改变
* 数据+模板结合，生成真实的DOM，替换原始的DOM

**缺陷:**
* 第一次生成了一个完整的DOM片段
* 第二次生成了一个完整的DOM片段
* 第二次的DOM替换第一次的DOM，非常耗性能
**第一种方案**
* state数据
* JSX模板
* 数据+模板结合，生成真实的DOM，来显示
* state发生改变
* 数据+模板结合，生成真实的DOM，并不直接替换原始的DOM
* 新的DOM和原始的DOM作比对，找出差异
* 找出input变化的部分（假设是input发生了改变）
* 只用新的DOM中的input发生改变的部分，替换老的DOM中的input部分
**缺陷**

性能的提升不够明显，DOM的比对也很耗性能

**虚拟DOM实现**
* state数据
* JSX模板
* 数据+模板结合，生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实DOM）（损耗了性能）（`['div',{id:'test'},['span',{},'hello jack']`）
* 用虚拟DOM的结构生成真实的DOM，来显示(`<div id="test"><span>hello jack</span></div>`)
* state发生变化
* 数据+模板生成新的虚拟DOM，（极大的提升了性能）（`['div',{id:'test'},['span',{},'hello lily']`）
* 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中的内容发生了改变（极大的提升了性能）
* 直接操作DOM，改变span中的内容

#### react-redux
**UI 组件**

`React-Redux` 将所有组件分成两大类：`UI` 组件（`presentational component`）和容器组件（`container component`）。

`UI` 组件有以下几个特征:

>1.只负责 `UI` 的呈现，不带有任何业务逻辑
 2.没有状态（即不使用`this.state`这个变量）
 3.所有数据都由参数（`this.props`）提供
 4.不使用任何 `Redux` 的 API

因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

**容器组件**

容器组件的特征恰恰相反:

> 1.负责管理数据和业务逻辑，不负责 `UI` 的呈现
2.带有内部状态
3.使用 `Redux` 的 API

总之，只要记住一句话就可以了：`UI` 组件负责 `UI` 的呈现，容器组件负责管理数据和逻辑。

**connect**
`React-Redux` 提供`connect`方法，用于从 `UI` 组件生成容器组件。`connect`的意思，就是将这两种组件连起来。

```
import { connect } from 'react-redux';
const mapStateToProps = (state)=> {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
// store.dispatch props
const mapDispatchToProps = (dispatch)=> {
    return {
        handleInputChange(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            }
            dispatch(action);
        },
        handleSubmit() {
            const action = {
                type: 'add_todo_item'
            }
            dispatch(action);
        },
        handleDelete(index) {
            const action = {
                type: 'delete_todo_item',
                index
            }
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
```
上面代码中，`connect`方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`。它们定义了 `UI` 组件的业务逻辑。前者负责输入逻辑，即将`state`映射到 `UI` 组件的参数（`props`），后者负责输出逻辑，即将用户对 `UI` 组件的操作映射成 `Action`。

**mapStateToProps()**

`mapStateToProps`是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）`state`对象到（`UI` 组件的）`props`对象的映射关系。

作为函数，`mapStateToProps`执行后应该返回一个对象，里面的每一个键值对就是一个映射。请看下面的例子。

```
const mapStateToProps = (state)=> {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
```
上面代码中，`mapStateToProps`是一个函数，它接受`state`作为参数，返回一个对象。这个对象有一个`inputValue`属性，代表 `UI` 组件的同名参数。

**mapDispatchToProps()**

`mapDispatchToProps`是`connect`函数的第二个参数，用来建立 `UI` 组件的参数到`store.dispatch`方法的映射。也就是说，它定义了哪些用户的操作应该当作 `Action`，传给 `Store`。

```
const mapDispatchToProps = (dispatch)=> {
    return {
        handleInputChange(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            }
            dispatch(action);
        },
        handleSubmit() {
            const action = {
                type: 'add_todo_item'
            }
            dispatch(action);
        },
    }
}

```
从上面代码可以看到，`mapDispatchToProps`作为函数，应该返回一个对象，定义了 `UI` 组件的参数怎样发出 `Action`。

**Provider组件**
`connect`方法生成容器组件以后，需要让容器组件拿到`state`对象，才能生成 `UI` 组件的参数。

`React-Redux` 提供`Provider`组件，可以让容器组件拿到`state`。

```
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import store from './store';

const App = (
    <Provider store={store}>
        <TodoList />
    </Provider>            
)

ReactDOM.render(App, document.getElementById('root'));
```
上面代码中，`Provider`在根组件外面包了一层，这样一来，`App`的所有子组件就默认都可以拿到`state`了。

#### react中间件
**中间件的概念**

为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

> （1）`Reducer`：纯函数，只承担计算 `State` 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
（2）`View`：与 `State` 一一对应，可以看作 `State` 的视觉层，也不合适承担其他功能。
（3）`Action`：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

想来想去，只有发送 `Action` 的这个步骤，即`store.dispatch()`方法，可以添加功能。举例来说，要添加日志功能，把 `Action` 和 `State` 打印出来，可以对`store.dispatch`进行如下改造。

```
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```

上面代码中，对`store.dispatch`进行了重定义，在发送 `Action` 前后添加了打印功能。这就是中间件的雏形。

中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 `Action` 和执行 `Reducer` 这两步之间，添加了其他功能。

**redux-logger**

日志中间件：添加日志功能，把 `Action` 和 `State` 打印出来

*store.js*

```
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

**react-thunk**

大家知道，`Action`是由`store.dispatch`方法发送的。而`store.dispatch`方法正常情况下，参数只能是对象，不能是函数。这时，就要使用中间件`redux-thunk`。

*store.js*
```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(reducer, enhancer);

export default store;
```
*actionCreators.js*

```
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST } from './actionTypes'
import axios from '../axios/index';

export const getInputChangeAction = (value)=> ({
    type: CHANGE_INPUT_VALUE,
    value
});

export const getAddItemAction = ()=> ({
    type: ADD_TODO_ITEM
});

export const getDeleteItemAction = (value)=> ({
    type: DELETE_TODO_ITEM,
    value
});

export const getInitList = (value)=> ({
    type: INIT_LIST,
    value
});

// 这里参数为函数
export const getTodoList = ()=> {
    return ((dispatch) => {
        axios.ajax({
            url: '/itemList',
            method: 'get',
            data:{
                params:{ id:156 }
            }
        }).then((res) => {
            const newArr = [];
            res.data.item_list.forEach(item => {
                newArr.push(item.name);
            })
            const action = getInitList(newArr);
            dispatch(action);
        })
    })
}

```
上面代码使用`redux-thunk`中间件，改造`store.dispatch`，使得后者可以接受函数作为参数。

因此，异步操作的第一种解决方案就是，写出一个返回函数的 `Action Creator`，然后使用`redux-thunk`中间件改造`store.dispatch`

**react-saga**

`redux-saga`是一个用于管理`redux`应用异步操作的中间件，`redux-saga`通过创建sagas将所有异步操作逻辑收集在一个地方集中处理，可以用来代替`redux-thunk`中间件。

*store.js*

```
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import mySagas from './sagas';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(mySagas);

export default store;
```
*saga.js*

```
import { takeEvery, put } from 'redux-saga/effects';
import { INIT_SAGA_LIST } from './actionTypes';
import { getInitList } from './actionCreators';
import axios from '../axios/index';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

function* getInitSagaList() {
    try {
        const res = yield axios.ajax({
            url: '/itemList',
            method: 'get',
            data: {
                params: {
                    id: 156
                }
            }
        })
        const newArr = [];
        res.data.item_list.map(item => {
            newArr.push(item.name);
        })
        const action = getInitList(newArr);
        yield put(action);
    } catch (e) {
        Modal.info({
            title: '提示',
            content: '服务繁忙，请稍后重试'
        })
    }
    
}

// generator函数
function* mySaga() {
    yield takeEvery(INIT_SAGA_LIST, getInitSagaList);
}

export default mySaga;
```
