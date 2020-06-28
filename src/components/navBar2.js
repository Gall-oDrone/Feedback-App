import '../assets/navBar.css';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter, Link } from "react-router-dom";
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import * as messageActions from "../store/actions/notification";

import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import NotificationHeaderMenu from "./NotificationHeaderMenu";
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from 'antd';
import WebSocketInstance from "../NTFNwebsocket";
import '../assets/navBar2.css';
// import { CSSTransition } from 'react-transition-group';

function ResponsiveNavigation({ background, hoverBackground, linkColor, navLinks, logo }) {
  const [ navOpen, setNavOpen ] = useState(0)
  const [ hoverIndex, setHoverIndex ] = useState(-1)
  return (
      <nav
          className="responsive-toolbar"
          style={{ background: background }}>
          <ul
              style={{ background: background }}
              className={ navOpen ? 'active' : '' }
          >
              <figure className="image-logo" onClick={ () => { setNavOpen(!navOpen) } }>
                  <img src={ logo } height="40px" width="40px" alt="toolbar-logo" />
              </figure>
              { navLinks.map((link, index) => 
                  <li
                      key={ index }
                      onMouseEnter={ () => { setHoverIndex(index) } }
                      onMouseLeave={ () => { setHoverIndex(-1) } }
                      style={{ background: hoverIndex === index ? (hoverBackground || '#999') : '' }}
                  >
                      <Link
                          to={link.path}
                          style={{ color: linkColor }}
                      >   { link.text }
                          <i className={ link.icon } />
                      </Link>
                  </li>
              )}
          </ul>
      </nav>
  )
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    unviews: state.notify.unview,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    setUnviews: unviews => dispatch(messageActions.setUnviews(unviews)),
  };
};

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ResponsiveNavigation)
// );

export default ResponsiveNavigation;
