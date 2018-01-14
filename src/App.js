/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
/******* 第三方 组件库 *****/
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
import Header from 'container/header/header'
import Tab from 'container/tab/tab'
import Player from 'component/player/player'
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
          <TransitionGroup className="router-transition">
            <CSSTransition
              classNames="fade"
              timeout={{enter: 500, exit: 300}}
            >
              <Switch>
                <Redirect path='/' exact to='/recommend'></Redirect>
                <Route path="/recommend" component={Recommend}></Route>
                <Route path="/singer" component={Singer}></Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Player></Player>
        </div>
      </Router>
    )
  }
}

export default App


/*<BrowserRouter>
  <Route
    render={props => {
      console.log(props)
      const { location } = props
      return (
        <div className="app">
          <Header />
          <Tab />
          <TransitionGroup className="router-transition">
            <CSSTransition
              classNames="fade"
              key={location.key}
              timeout={{ enter: 5000, exit: 5000 }}>
              <Switch>
                <Redirect path="/" exact to="/recommend" />
                <Route path="/recommend" component={Recommend} />
                <Route path="/singer" component={Singer} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Player />
        </div>
      )
    }}
  />
</BrowserRouter>*/
