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
    console.log("PROPS")
    console.log(JSON.stringify(props))
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
                footer={
                    <div>
                        <b>ant design</b> footer part
                </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type="star-o" text={item.rating_count} key= {item.rating_count}/>,
                            <IconText type="like-o" text={item.likes_count} key= {item.likes_count}/>,
                            <IconText type="message" text={item.comment_count} key= {item.comment_count}/>,
                        ]}
                        extra={
                            // <img
                            //     width={272}
                            //     alt="logo"
                            //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            // />
                            <video width="250" controls >
                                <source src={`${media_endpoint}/${item.video}`} type="video/mp4"/>
                                Your browser does not support HTML5 video.
                            </video>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.thumbnail} />}
                            title={<a href={`/articles/detailmenu/${item.id}`}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
    )
}

export default Articles;