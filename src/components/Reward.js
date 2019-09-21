import React from "react";
import { Badge, Icon, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class Reward extends React.Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="end">
                    <Col span={8}>
                        <Badge count={6}>
                            <a href="Corso" className="head-example" />
                        </Badge>
                    </Col> 
                    <Col span={8}>
                        <Badge count={0} showZero>
                            <a href="Daddy" className="head-example" />
                        </Badge>
                    </Col>
                    <Col span={8}>
                        <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
                            <a href="Go" className="head-example" />
                        </Badge>
                    </Col>
                </Row>
            </div>
  
        );
    }
}

export default Reward;