/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { setAdd, setRemove, setCheng, setChu } from 'store/actions'
import { getAdd, getRemove, getCheng, getChu } from 'store/async-actions'
/******* 第三方 组件库 *****/
import { List, Button, WhiteSpace } from 'antd-mobile'
/**** 本地公用变量 公用函数 **/
import { echartsMixin } from 'common/js/mixin'
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

@connect(
  // 你要state什么属性放到props里
  state => ({ num: state }),
  // 你要什么方法，放到props里，自动dispatch
  { setAdd, setRemove, setCheng, setChu, getAdd, getRemove, getCheng, getChu }
)

// @echartsMixin('noresize', 'nodestroy')
@echartsMixin()
class TestRedux extends Component {
  componentDidMount() {
    this.props.pourIns({
      resize: () => {console.log('resize1')},
      dispose: () => {console.log('dispose1')}
    }, {
      resize: () => {console.log('resize2')},
      dispose: () => {console.log('dispose2')}
    })
  }
  render() {
    const { Item } = List
    return (
      <div>
        <h1 className="test">加减state：{this.props.num.addRemoveCounter}</h1>
        <h1 className="test">乘除state：{this.props.num.chengChuCounter}</h1>
        <List>
          <Item><Button type="primary" onClick={() => this.props.setAdd(2)}>加</Button></Item>
          <Item><Button type="primary" onClick={() => this.props.setRemove(2)}>减</Button></Item>
          <Item><Button type="primary" onClick={() => this.props.getCheng(3)}>乘</Button></Item>
          <Item><Button type="primary" onClick={() => this.props.getChu(2)}>除</Button></Item>
          <WhiteSpace></WhiteSpace>
          <Item><Button onClick={
            () => {
              this.props.history.push('/hello')
            }
          }>goto hello</Button></Item>
        </List>
      </div>
    )
  }
}
// TestRedux = echartsMixin(TestRedux)
// connect 接受四个参数，一般只是定义前两个就好了
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

// 方式一 直接写在上面
// TestRedux = connect(
//   state => ({ num: state }),
//   { setAdd, setRemove, setCheng, setChu, getAdd, getRemove, getCheng, getChu }
// )(TestRedux)

// 方式二 单提出来
// const mapStateToProps = (state) => ({ num: state })
// const mapDispatchToProps = { setAdd, setRemove, setCheng, setChu, getAdd, getRemove, getCheng, getChu }
// TestRedux = connect(mapStateToProps, mapDispatchToProps)(TestRedux)

export default TestRedux
