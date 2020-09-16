import '../assets/navBar.css';
import { connect } from 'react-redux';
import * as actions from "../store/actions/auth";
import { withRouter } from "react-router-dom";
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
// import { CSSTransition } from 'react-transition-group';

class NavMenu extends React.Component {

  initialiseNTFNS() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchNTFNViews(
        this.props.username,
      );
    });
    WebSocketInstance.notification_connect(this.props.username)
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbackUnviewNTFNS(
      this.props.setUnviews.bind(this),
    );
    if(this.props.username !== undefined){
      this.initialiseNTFNS();
    }
  }

  waitForSocketConnection(callback) {
    const component = this;
    if (WebSocketInstance.state() === 1) {
      console.log("Connection is made");
      callback();
      return;
    } 
    // const timer = setTimeout(function() {
    //   if (WebSocketInstance.state() === 1) {
    //     console.log("Connection is made");
    //     callback();
    //     return;
    //   } else {
    //     console.log("wait for connection...");
    //     component.waitForSocketConnection(callback);
    //   }
    // }, 10);
    // if(timer > 10){
    //   console.log("timer is greater than 10 milisecs, it's: ", timer);
    //   this.componentWillUnmount(timer)
    // }
  }

  componentWillUnmount(timer){
    clearTimeout(timer);
    console.log("Timer after: ", timer)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token != null) {
        if(newProps.username != undefined){
          // WebSocketInstance.disconnect();
          this.waitForSocketConnection(() => {
            WebSocketInstance.fetchNTFNViews(
              newProps.username,
            );
          });
      WebSocketInstance.notification_connect(newProps.username);
      } else {
        WebSocketInstance.disconnect();
      }
    }
  }

  render() {
    return (
      <Navbar>
        <NavItem icon={<BellIcon />} unviews={this.props.unviews} username={this.props.username}>
          <NotificationHeaderMenu/>
        </NavItem>
        {/* <NavItem  icon={<MessengerIcon />}/> */}
      </Navbar>
    );
  }
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  const handleUpdates = async () => {
    if(props.unviews != 0){
      WebSocketInstance.updateNTFNS(
        props.username,
      );
      return( WebSocketInstance.fetchNTFNViews(
        props.username,
      ))      
    } else {
      return
    }
    
  }
  return (
    <li className="nav-item">
      <Badge count={props.unviews} style={{top: "20%"}} >

      <a href="#" className="icon-button" onClick={() => handleUpdates().then(() =>setOpen(!open))}>
        {props.icon}
      </a>

      {open && props.children}
      </Badge>
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      // <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
    <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      {/* <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}> */}
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem>

        </div>
      {/* </CSSTransition> */}

      {/* <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}> */}
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      {/* </CSSTransition> */}

      {/* <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}> */}
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      {/* </CSSTransition> */}
    </div>
  );
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavMenu)
);
