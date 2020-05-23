import React from "react";
import { List, Tag } from 'antd';

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
            dataSource={data.order_items}
            renderItem={(orderItem, i) => (
              <List.Item
                key={i}
                extra={
                  <img
                    width={72}
                    floated="left"
                    alt="logo"
                    src={`http://127.0.0.1:8000${orderItem.item.image}`}
                  />
                }
              >
                <List.Item.Meta
                  description={<div>{orderItem.quantity} x {orderItem.item.title}</div>}
                />
                <div>
                  <Tag>${orderItem.final_price}</Tag>
                </div>

              </List.Item>
            )}
            footer={
              <div>
                <h3>Order Total: ${data.total}</h3>
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