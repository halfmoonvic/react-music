/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/
import TestRedux from './store/test-redux.js'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect path='/' exact to='/testredux'></Redirect>
          <Route path='/testredux' component={TestRedux}></Route>
          <Route path='/hello' component={Hello}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App

class Hello extends Component {
  render() {
    return (
      <div>
        <p>你好啊，格里高利</p>
        <button onClick={
          () => {
            this.props.history.push('/testredux')
          }
        }>goto hello</button>
      </div>
    )
  }
}
