import React from 'react';
import { connect } from "react-redux";
import { Button, notification } from 'antd';

const openNotification = (props) => {
  const args = {
    message: props.message,
    description:
      props.description,
    duration: 3,
  };
  notification.open(args);
};

const MAN = props => {
    return(
        <Button type="primary" onClick={openNotification(props)}>
            Open the notification box
        </Button>
    )
}

export default MAN;