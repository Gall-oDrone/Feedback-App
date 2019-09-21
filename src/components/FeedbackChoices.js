import React from "react";
import { Radio } from 'antd';

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}

class FeedbackChoices extends React.Component {
render() {
    return (
        <div>
            <div>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">Bug report</Radio.Button>
                    <Radio.Button value="b">Feature request</Radio.Button>
                    <Radio.Button value="c">Report a security vulnerability</Radio.Button>
                </Radio.Group>
            </div>
        </div>
        )
    }
}

export default FeedbackChoices;