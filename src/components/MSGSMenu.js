import axios from "axios";
import '../assets/navBar.css';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { messageListScrollerURL } from "../constants";
import React, { useState, useEffect, useRef } from 'react';

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [ntfns, setNTFNS] = useState(props.NTFNS);
    const [hasMore, setHasMore] = useState(props.hasMore);
    const [offset, setOffset] = useState(5);
    const [limit, setLimit] = useState(7);
    console.log("msgs: "+ JSON.stringify(ntfns), props)

    useEffect(() => {
      // setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
      if (ntfns.length !== props.NTFNS.length) {            
        setNTFNS(props.NTFNS)
        // return(props.NTFNS)
      }
      if (hasMore !== props.hasMore) {            
        setHasMore(props.hasMore);
        // return(props.hasMore)
      }
    }, [props])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
    function DropdownItem(props) {
      return (
        <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
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
              axios.get(messageListScrollerURL(props.username, limit, offset))
              .then(res => {
                console.log("data: "+ JSON.stringify(res.data))
                  const data = res.data.message;
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
                  setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
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
                    ntfns.length > 0 ?
                      Object.values(ntfns).map((el, i) => {
                        return(
                          <DropdownItem key={i}>
                            {/* <div className="menu-item-text"> */}
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div>
                                  <p style={{fontSize:"0.8em"}} className="menu-item-author">{el.author}</p>
                                </div>
                                <div>
                                  <p style={{fontSize:"1em"}} className="menu-item-text">{el.content}</p>
                                </div>
                              </div>
                            {/* </div> */}
                          </DropdownItem>
                          )
                      })
                    :<div id="emptycontainer">
                        <span>Empty</span>
                      </div>
                  :<div className="loader"></div>
                :null}
          </div>
      </div>
    );
  }

class NTFNDDMenu extends React.Component {
    render(){
      console.log("ntfns 0: "+ JSON.stringify(this.props.ntfns))
        return(
          this.props.username !== null && this.props.ntfns !== undefined ?
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