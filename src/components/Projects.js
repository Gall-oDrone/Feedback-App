import React, { useState, useRef } from 'react';
import { List, Avatar, Drawer, Tooltip, Icon, Card } from 'antd';
import {media_endpoint} from "../constants";
import DonationDrawer from "./DonationDrawer";
import "../assets/projectsGrid.css";

const { Meta } = Card;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text !== undefined && text !== null ? text:0}
    </span>
);

class Articles extends React.Component{    
    
    state = {
        visible: false,
        key_id: null
    }

    render() {
        const { visible, key_id } = this.state;
        const { data } = this.props;
        return (
            <div>
                <List
                    itemLayout="vertical"
                    grid={{  gutter: 16, column: 4 }}
                    size="small"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 16,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                style={{ width: 260, height: "auto" }}
                                bodyStyle={{padding: "0"}}
                                key={item.id}
                            >
                                <Meta
                                className="card__container"
                                />
                                    <div className="card_container">
                                        {/* <div className="ant-card-body"> */}
                                        <div className="card__image-container2">
                                            {item.project_video !== null ?
                                                <video width="auto" controls>
                                                    <source src={`${media_endpoint}/${item.project_video}`} type="video/mp4"/>
                                                    Your browser does not support HTML5 video.
                                                </video>
                                            :   
                                                    <img
                                                        alt="logo"
                                                        src={`${item.project_image}`}
                                                    />
                                            }
                                        </div>
                                        {/* </div> */}
                                    <div className="card__title">
                                        <a href={`/projects/detailmenu/${item.id}`}>{item.title}</a>
                                    </div>
                                    <div className="card__donation">
                                        {
                                            item.project_crowdfunding_type !== null ? 
                                                <Tooltip placement="bottom" title={"Donate"} trigger="hover">
                                                    <span>
                                                        <button onClick={() => this.setState({visible:true, key_id:item.id})}>
                                                            <Icon type="dollar" />
                                                        </button>
                                                    </span>
                                                </Tooltip>
                                            : null
                                        }
                                    </div>
                                    <div className="card__stats2" key="comment_counter">
                                        <div className="stat2">
                                            <IconText type="message" text={item.comment_count} key= {item.comment_count}/>
                                        </div>
                                        <div className="stat2" key="view_counter">
                                            <IconText type="eye" text={item.view_count} key= {item.view_count}/>
                                        </div>
                                        <div className="stat2" key="like_counter">
                                            <IconText type="like-o" text={item.likes_count} key= {item.likes_count}/>
                                        </div>
                                    </div>
                                    </div>
                            </Card>
                            <span/>

                            {/* <List.Item.Meta
                                avatar={<Avatar src={item.thumbnail} />}
                                title={<a href={`/projects/detailmenu/${item.id}`}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content} */}
                        </List.Item>
                    )}
                />
                    {visible ?
                        <div>
                            <DonationDrawer dDrawer={visible} id={key_id}/>
                        </div>
                    :null}
                </div>

                // <body>
                // <div className="main">
                // <section className="cards">
                //     <div className="card">
                //         <div className="card__image-container">
                //             <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80" />
                //         </div>
                //         <div className="card__content">
                //             <p className="card__title text--medium">Here's the Title of an Awesome Course</p>
                //             <div className="card__info">
                //                 <p className="text--medium">30 </p>
                //                 <p className="card__price text--medium">Free</p>
                //             </div>
                //             <div className="card__stats">
                //                 <div class="stat">
                //                     <div className="value">4<sup>m</sup></div>
                //                     <div className="type">read</div>
                //                 </div>
                //                 <div className="stat border">
                //                   <div className="value">5123</div>
                //                   <div className="type">views</div>
                //                 </div>
                //                 <div className="stat">
                //                   <div className="value">32</div>
                //                   <div className="type">comments</div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </section>
                // </div>
                
                // </body>
        )
    }
}

export default Articles;