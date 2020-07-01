import axios from "axios";
import '../assets/navBar.css';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { notificationListScrollerURL } from "../constants";
import React, { useState, useEffect, useRef } from 'react';

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [ spinner, setSpinner ] = useState(true);
    const [ntfns, setNTFNS] = useState(props.NTFNS);
    const [hasMore, setHasMore] = useState(props.hasMore);
    const [offset, setOffset] = useState(5);
    const [limit, setLimit] = useState(7);
    console.log("ntfns: "+ JSON.stringify(ntfns), props)
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }

    function handleScroll(e){
      let element = e.target
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
       
        console.log("CULO: "+ hasMore)
          if(hasMore === true) {
            setLoading(true)
            setTimeout(() =>{
              axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${props.token}`
              }
              axios.get(notificationListScrollerURL(props.username, limit, offset))
              .then(res => {
                console.log("data: "+ JSON.stringify(res.data))
                  const data = res.data.notification;
                  const has_more = res.data.has_more;
                  Object.values(data).map((el, i) => {
                    const content =
                    {'id': el.id,
                    'author': el.user,
                    'content': el.description,
                    'timestamp': Date(el.timestamp)}
                    if(has_more === true){
                      setNTFNS(ntfns.concat(content))
                      setOffset(limit)
                      setLimit(offset+limit)
                    }
                  })
                  setHasMore(has_more)
                  console.log("ahah: "+ has_more, hasMore)
              })
              .catch(err => {
                  console.error("ERROR: ", err)
                  setLoading(false)
              })
              setLoading(false)
            }, 1000)
          } else { 
            return
          }
        }
    }
  
    return (
      <div className="dropdown" style={{ height: '250px' }} ref={dropdownRef} onScroll={handleScroll}>
          <div className="menu">
              {ntfns !== undefined ? 
                loading === false ? 
                  Object.values(ntfns).map((el, i) => {
                    return(
                      <DropdownItem key={i}>
                          <p>{el.content}</p>
                      </DropdownItem>
                      )
                  })
                  :<div className="loader"></div>
                :null}
          </div>
      </div>
    );
  }

class NTFNDDMenu extends React.Component {
    render(){
      console.log("ntfns 0: "+ this.props.ntfns)
        return(
          this.props.ntfns !== undefined && this.props.ntfns.length > 0?
            <DropdownMenu 
              NTFNS={this.props.ntfns} 
              username={this.props.username} 
              token={this.props.token} 
              hasMore={this.props.hasMore}>

            </DropdownMenu>
          : null
        )
    }

}

export default NTFNDDMenu;