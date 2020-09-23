import React from 'react';
import { List, Avatar, Icon, Tag } from 'antd';
import {media_endpoint} from "../constants"
import "../assets/session.css"
import "../assets/inquiries.css"
var moment = require('moment');
function handleDegree(degree){
    if(degree.doctorate !== null){
        return degree.doctorate 
    }
    else if (degree.master !== null){
        return degree.master 
    }
    else if (degree.bachelor !== null){
        return degree.bachelor 
    }
    else{ return null}
}

const Articles = (props) => {
    console.log("ehreno", props)
    return (
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                                  <div id="session-div-1">
                                    <img
                                        className="contain"
                                        alt="logo"
                                        src={item.user_info.profile_avatar}
                                    />
                                </div>
                            // <video width="250" controls >
                            //     <source src={`${media_endpoint}/${item.video}`} type="video/mp4"/>
                            //     Your browser does not support HTML5 video.
                            // </video>
                        }
                    >
                        {/* <List.Item.Meta
                            title={<a href={`/collaboration/${item.id}`}>{item.user_info.name}</a>}
                        />
                        <p>Type: <Tag>{`${item.collaboration_type.toUpperCase()}`}</Tag></p>
                        <p>Category: <Tag>{item.collaboration_cat.toUpperCase()}</Tag></p>
                        <p>Field: <Tag>{item.collaboration_ad ? 
                                        item.collaboration_ad.toUpperCase()
                                        :item.collaboration_if.toUpperCase()
                                        }</Tag>
                        </p>
                        <p>From: <Tag>{`${item.user_info.university} `}</Tag></p> */}
                        <div className="inquiry-summary-search-result">
                          <div className="statscontainer">
                            <div className="stats">
                                <div className="status">
                                    <span>
                                        {"Type:"}
                                    </span>
                                    <div>
                                        <Tag >{item.collaboration_type.toUpperCase()}</Tag>
                                    </div> 
                                    </div>
                                <div className="category">
                                  <span>
                                    {"Category:"}
                                  </span>
                                  <div className="status">
                                    <Tag>
                                      {item.collaboration_cat.toUpperCase()}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="topic">
                                  <span>
                                    {"Field:"}
                                  </span>
                                  <div>
                                    <Tag>
                                        {item.collaboration_ad ? 
                                            item.collaboration_ad.toUpperCase()
                                            :item.collaboration_if.toUpperCase()
                                        }
                                    </Tag>
                                  </div>
                                </div>
                            </div>

                          </div>
                          <div className="session-summary">
                            <div className="summary-fst-row-con">
                                <div className="author">
                                    <a className="post-tag" style={{color:"black"}} href={`/profile-page/${item.user_info.profile_username}`}><span>{item.user_info.name}</span></a>
                                </div>
                                <div className="time">
                                    <span>{moment(item.timestamp).format("MMMM Do YYYY")}</span>
                                </div>
                            </div>
                            <div className="title">
                              <h3>
                                <a>
                                  {/* {item.title} */}
                                </a>
                              </h3>
                            </div>
                            <div className="excerpt">
                              {/* {item.content} */}
                            </div>
                            <div className="summary-last-row-con">
                                <div className="views">
                                <Icon type={"eye"}/> <span>{"0"}</span>
                                </div>
                                <div className="college">
                                <Tag color="blue">{item.user_info.university}</Tag>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="more-info-button">
                            <a href={`/collaboration/${item.id}`} >
                              More Info
                            </a>
                        </div>
                    </List.Item>
                )}
            />
    )
}

export default Articles;