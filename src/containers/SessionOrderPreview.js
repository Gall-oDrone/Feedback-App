import React from "react";
import { List, Tag } from 'antd';
import moment from 'moment';

const OrderPreview = props => {
  const { data } = props;
  console.log("DATA: ", data)
  return (
    <React.Fragment>
      {data && (
        <React.Fragment>
          <List
            itemLayout="vertical"
            size="small"
            bordered={true}
            dataSource={data.session_order_items}
            renderItem={(orderItem, i) => (
              <List.Item
                key={i}
                extra={
                  <img
                    width={72}
                    floated="left"
                    alt="logo"
                    src={`http://127.0.0.1:8000${orderItem.session.session_photo}`}
                  />
                }
              >
                <List.Item.Meta
                  description={
                    <div>
                  <div>{orderItem.hrs} Hr. x $ {orderItem.session.price_per_hour}</div>
                  <div>On {moment(orderItem.date).format("YY-MM-DD")} FROM {moment(orderItem.start_time).format("HH")} TO {moment(orderItem.end_time).format("HH")}</div>
                  <div>User: {orderItem.session.user_name.name}</div>
                  </div>
                }
                />
                <div>
                  <Tag>${orderItem.total_session_price}</Tag>
                </div>

              </List.Item>
            )}
            footer={
              <div>
                <h3>Order Total: ${data.session_order_items[0].total_session_price}</h3>
                {data.coupon && (
                  <Tag color="green" style={{ marginLeft: "10px" }}>
                    Current coupon: {data.coupon.code} for $
                    {data.coupon.amount}
                  </Tag>
                )}
              </div>
            }
          >
          </List>

        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OrderPreview;