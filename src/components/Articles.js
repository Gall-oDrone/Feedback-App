import React from 'react';
import { List, Avatar, Icon } from 'antd';
import {media_endpoint} from "../constants"
import "../assets/articlesGrid.css"
var moment = require('moment');

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
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        // actions={[
                        //     <IconText type="eye" text={item.view_count} key= {item.view_count}/>,
                        //     <IconText type="like-o" text={item.likes_count} key= {item.likes_count}/>,
                        //     <IconText type="message" text={item.comment_count} key= {item.comment_count}/>,
                        // ]}
                        // extra={
                        //     item.thumbnail !== undefined &&
                        //     item.thumbnail !== null ?
                        //     <div 
                        //         style={{
                        //             display: "flex",
                        //             width: "120px",
                        //             minHeight: "120px",
                        //             maxHeight: "auto",
                        //             // float: "left",
                        //             margin: "3px",
                        //             padding: "3px"
                        //         }}
                        //     >
                        //         <img
                        //             style={{width:"100%", objectFit:"cover"}}
                        //             alt="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        //             src={item.thumbnail}
                        //         />
                        //     </div>
                        //     :
                        //     item.video !== null ?
                        //         <video width="250" controls >
                        //             <source src={`${media_endpoint}/${item.video}`} type="video/mp4"/>
                        //             Your browser does not support HTML5 video.
                        //         </video>
                        //     : null
                        // }
                    >
                        <div className="article-container">
                            <div className="article-details">
                                <div className="article-author">
                                    <div className="article-author-container">
                                        <div className="article-author-avatar">
                                            {<a href={`/profile-page/${item.author}`}><Avatar src={item.user_thumbnail} /></a>}
                                        </div>
                                        <div className="article-ad-container">
                                            <div className="article-author-name">
                                                {<a href={`/profile-page/${item.author}`}><span>{item.user_name}</span></a>}
                                            </div>
                                            <div className="article-author-published">
                                                <span>
                                                {moment(item.timestamp).format("MMMM Do YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-article">
                                    {<a href={`/articles/detailmenu/${item.id}`}><h3>{item.title}</h3></a>}
                                    {item.overview}
                                </div>
                                <div className="article-statistics">
                                    <div>
                                        <IconText type="eye" text={item.view_count} key= {item.view_count}/>
                                    </div>
                                    <div>
                                        <IconText type="like-o" text={item.likes_count} key= {item.likes_count}/>
                                    </div>
                                    <div>
                                        <IconText type="message" text={item.comment_count} key= {item.comment_count}/>
                                    </div>
                                </div>
                            </div>
                                <div className="article-image">
                                    <div className="article-image-container">
                                        <img
                                            alt="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            src={item.thumbnail}
                                        />
                                    </div>
                                </div>
                        </div>
                        {/* <List.Item.Meta
                            avatar={<a href={`/profile-page/${item.author}`}><Avatar src={item.user_thumbnail} /></a>}
                            name = {<p>{item.user_name}</p>}
                            title={<a href={`/articles/detailmenu/${item.id}`}>{item.title}</a>}
                            description={item.overview}
                        /> */}
                    </List.Item>
                )}
            >
            </List>
    )
}

export default Articles;