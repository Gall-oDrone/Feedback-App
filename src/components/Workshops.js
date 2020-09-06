import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {media_endpoint} from "../constants"
import "../assets/workshop.css"

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
                        id="ant-list-item-no-flex"
                    >
                        <div className="workshop-card" key={item.id}>
                            <div className="-col-md-4" key={item.id}>
                                <img src={item.image}>
                                </img>
                                
                            </div>
                            <div className="-col-md-8" key={item.id}>
                                <h2>
                                    {item.title}
                                </h2>
                                <p>
                                    {item.overview}
                                </p>
                                <div key={item.id}>
                                    <a href={`/workshops/${item.id}`}>
                                            More Info
                                    </a>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
    )
}

export default Articles;