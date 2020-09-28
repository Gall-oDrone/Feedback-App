import React from 'react';
import {
  Form,
  Cascader,
} from 'antd';

  const collabAddProject = ({ props, pull, val }) => {
    const { getFieldDecorator } = props;
    console.log("CHAVA I: ", pull)
    const values = pull.map(el => {return({value:el.id, label:el.title})})
    return(
          <div>
            <p>Please select</p>
            <Form.Item wrapperCol={{ sm: 14 }} style={{ display:"flex", width: "100%", justifyContent: "center" }}>
              {getFieldDecorator("selected_project", {
                          preserve:true,
                          initialValue: "",
                          rules: [
                            { type: 'array', required: true, message: 'Please select a position' },
                          ],
                        })(<Cascader style={{widht:"100%"}} onChange={val} options={values} />)
              }
            </Form.Item>
          </div>
    )
  }

  const WrappedFetchProject = Form.create()(collabAddProject);;
  export default WrappedFetchProject