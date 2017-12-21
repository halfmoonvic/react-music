/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Header from 'container/header/header'
import Tab from 'container/tab/tab'
/**** 当前组件的 子组件等 ***/
import Recommend from 'container/recommend/recommend'
import Singer from 'container/singer/singer'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header></Header>
          <Tab></Tab>
          <Switch>
            <Redirect path='/' exact to='/recommend'></Redirect>
            <Route path="/recommend" component={Recommend}></Route>
            <Route path="/singer" component={Singer}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
