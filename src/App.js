/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Header from 'container/header/header'
import Tab from 'component/tab/tab'
/**** 当前组件的 子组件等 ***/
import Recommend from 'container/recommend/recommend'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header></Header>
          <Tab></Tab>
          <Switch>
            <Recommend></Recommend>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
