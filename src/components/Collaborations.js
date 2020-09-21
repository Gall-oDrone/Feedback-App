import React from 'react';
import { List, Avatar, Icon, Tag } from 'antd';
import {media_endpoint} from "../constants"
import "../assets/session.css"

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
                        <List.Item.Meta
                            title={<a href={`/collaboration/${item.id}`}>{item.user_info.name}</a>}
                        />
                        <p>Type: <Tag>{`${item.collaboration_type.toUpperCase()}`}</Tag></p>
                        <p>Field: <Tag>{`${item.collaboration_ad.toUpperCase()}`}</Tag></p>
                        <p>From: <Tag>{`${item.user_info.university} `}</Tag></p>
                    </List.Item>
                )}
            />
    )
}

export default Articles;