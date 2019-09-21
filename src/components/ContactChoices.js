import React from "react";
import { Radio } from 'antd';

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}

class ContactChoices extends React.Component {
render() {
    return (
        <div>
            <div>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">Send Email</Radio.Button>
                    <Radio.Button value="b">Make a Call</Radio.Button>
                    <Radio.Button value="c">Video chat session</Radio.Button>
                    <Radio.Button value="d">Chat</Radio.Button>
                    <Radio.Button value="d">Schedule a call</Radio.Button>
                </Radio.Group>
            </div>
        </div>
        )
    }
}

export default ContactChoices;