/**** React应用依赖组件 ****/
// core
import React, { Component } from 'react'
/******* 第三方 组件库 *****/
import styled, { keyframes, ThemeProvider } from 'styled-components'
/**** 本地公用变量 公用函数 **/
/******* 本地 公用组件 *****/
/**** 当前组件的 子组件等 ***/

// 基础的 。。。。。。。。。。。
const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: ${(props, ...args) => {
      console.log(props)
      console.log(args)   // 只有一个 props， 没有其它值了
      return props.primary ? 'SteelBlue' : 'palevioletred'
    }};
`;

// 还可以对其它组件进行包装
const StyledLink = styled(Title)`
  background: blue;
  text-align: left;
`;

// 已经被 styled 的 组件用 extend，自己平常引用的组件使用 styled()形式 我的理解是这样的
const ExtendTitle = Title.extend`
  color: #0f0;
  border: 1px solid #0f0;
`

// .attrs constructor. It allows you to attach additional props (or "attributes") to a component.
const Input = styled.input.attrs({
  // we can define static props
  type: 'password',

  // or we can define dynamic ones
  margin: props => props.size || '1em',
  padding: props => {
    console.log(props)
    return props.size || '1em'
  }
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

// 动画
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;


// 高级的 。。。。。。。。。。。
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// We're passing a default theme for Buttons that aren't wrapped in the ThemeProvider
// 默认的主题
Button.defaultProps = {
  theme: {
    main: '#0f0'
  }
}

// Define what props.theme will look like
// 主题也可以自定义，然后通过 ThemeProvider 组件传递过去
const theme = {
  main: '#f0f'
};


// Define our button, but with the use of props.theme this time
const ButtonTheme = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// Define our `fg` and `bg` on the theme
const buttontheme = {
  fg: '#000',
  bg: '#00f'
};

// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});


const InputForm = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class Form extends React.Component {
  render() {
    return (
      <InputForm
        placeholder="Hover here..."
        innerRef={x => { this.input = x }}
        onMouseEnter={() => this.input.focus()}
      />
    );
  }
}


class TestStyleComponents extends Component {
  render() {
    return (
      <div>
        <Title haha="eee">Hello world</Title>
        <StyledLink>diy的啊</StyledLink>
        <ExtendTitle>ExtendTitle</ExtendTitle>
        <Input placeholder="A small text input" size="1em" />
        <Rotate><span role="img" aria-label="read" aria-labelledby="read">&lt; 💅 &gt;</span></Rotate>

        <Button>使用Button组件默认的theme</Button>
        <ThemeProvider theme={theme}>
          <Button>使用自定的theme</Button>
        </ThemeProvider>

        <ButtonTheme theme={{ fg: '#000', bg: '#fff' }}>直接将theme写到组件上面</ButtonTheme>
        <ThemeProvider theme={buttontheme}>
          <div>
            <ButtonTheme>Default Theme</ButtonTheme>

            <ThemeProvider theme={invertTheme}>
              <ButtonTheme>Inverted Theme</ButtonTheme>
            </ThemeProvider>
          </div>
        </ThemeProvider>

        <Form />
      </div>
    )
  }
}

export default TestStyleComponents
