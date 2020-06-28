import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {media_endpoint} from "../constants"
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


const Articles = (props) => {
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
                        key={item.title}
                        extra={
                            <a href={`/sessions/${item.id}`}>
                                  <div id="session-div-1">
                                    <img
                                        className="contain"
                                        alt="logo"
                                        src={item.session_photo}
                                    />
                                </div>
                            </a>
                            // <video width="250" controls >
                            //     <source src={`${media_endpoint}/${item.video}`} type="video/mp4"/>
                            //     Your browser does not support HTML5 video.
                            // </video>
                        }
                    >
                        <List.Item.Meta
                            title={<a href={`/sessions/${item.id}`}>{item.user_name.name}</a>}
                            description={`$ ${item.price_per_hour} per hour`}
                        />
                        {/* <p>{`${item.user_name.name} `}</p> */}
                        <p>{`From: ${item.user_name.university} `}</p>
                        <p>{`Degree: ${item.user_name.bachelor} `}</p>
                    </List.Item>
                )}
            />
    )
}

export default Articles;