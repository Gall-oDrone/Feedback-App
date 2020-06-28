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
// import { CSSTransition } from 'react-transition-group';

import ResponsiveNavigation from './navBar2';
import '../assets/navBar2.css';

function Corso() {
	const navLinks = [
		{
			text: 'Home',
			path: '/',
			icon: 'ion-ios-home'
		},
		{
			text: 'Contact',
			path: '/contact',
			icon: 'ion-ios-megaphone'
		},
		{
			text: 'About',
			path: '/about',
			icon: 'ion-ios-business'
		},
		{
			text: 'Blog',
			path: '/blog',
			icon: 'ion-ios-bonfire'
		},
		{
			text: 'Portfolio',
			path: '/portfolio',
			icon: 'ion-ios-briefcase'
		}
	]

	return (
		<div className="navMain">
			<ResponsiveNavigation
				navLinks={ navLinks }
				logo={ <BellIcon /> }
				background="#fff"
				hoverBackground="#ddd"
				linkColor="#777"
			/>
			
		</div>
	);
}

export default Corso;
