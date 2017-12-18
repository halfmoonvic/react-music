/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Header from 'component/header/header'
/**** 当前组件的 子组件等 ***/
// import TestRedux from './store/test-redux.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header></Header>

          <hr/>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topics}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App

function Home(props) {
  console.log(props)
  return <div>Home页</div>
}

function About(props) {
  console.log(props)
  return <div>About页面</div>
}

function Topics(props) {
  console.log(props)
  return (
    <div className="topic">
      <h2>Topic页面</h2>
      <ul className="topic-nav">
        <Link to={`${props.match.url}/aaa`}>aaa</Link>
        <br/>
        <Link to={`${props.match.url}/bbb`}>bbb</Link>
      </ul>
      <Route path={`${props.match.url}/:id`} component={TopicSon}></Route>
      <Route path={props.match.url} exact component={FFj}></Route>
    </div>
  )
}

function TopicSon(props) {
  console.log(props)
  return (
    <div>{props.match.params.id}</div>
  )
}

function FFj() {
  return <div>本组件</div>
}
