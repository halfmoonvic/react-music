import './_mod-m-header.scss'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="c-site-header">
        <div className="site-header__icon"></div>
        <div className="site-header__text">Chicken Music</div>
        <Link className="site-header__mine" to="/mine">
          <i className="icon-mine"></i>
        </Link>
      </div>
    )
  }
}

export default Header
