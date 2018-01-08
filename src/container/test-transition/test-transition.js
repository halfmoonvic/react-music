/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './style.scss'

const Fade = ({ children, ...props }) => {
  console.log(props)
  return (
    <CSSTransition {...props} timeout={1000} classNames="test">
      {children}
    </CSSTransition>
  )
}

class TestTransition extends Component {
  constructor(props) {
    super(props)
    this.state = { items: ['hello', 'world', 'click', 'me'] }
  }
  handleAdd() {
    this.setState({
      items: [...this.state.items, prompt('Enter some text')]
    })
  }
  handleRemove(i) {
    let newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({ items: newItems })
  }
  render() {
    return (
      <div className="c-transition">
        <TransitionGroup className="todo-list">
          {this.state.items.map((item, i) => (
            <Fade key={item}>
              <div>
                {`${item} `}
                <button onClick={() => this.handleRemove(i)}>&times;</button>
              </div>
            </Fade>
          ))}
        </TransitionGroup>
        <button onClick={() => this.handleAdd()}>Add Item</button>
      </div>
    )
  }
}

export default TestTransition

// 1. 它之所以没有出现 在 一个空元素上面 实施 removeClass 现象的原因是。他直接将 transition 给删掉了，而不是 transition 下面的元素
