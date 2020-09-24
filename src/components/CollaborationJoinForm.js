import React from 'react';
import {
    Form,
  } from 'antd';

  const recruitment_ops = [
    {
      type: "Push",
      desc: "If you are seeking to join either someone's project or a team"
    },
    {
      type: "Pull",
      desc: "If you are seeking people to join one of your projects"
    }
  ]

  const collabJoinForms = ( {val, props} ) => {
      const { getFieldDecorator } = props;
      return(

        <div>
        <h2>Collaboration join form</h2>
          <Form.Item style={{width:"100%"}}>
            {getFieldDecorator('recruitment', {
            preserve:true,
                rules: [
                  { required: true, message: 'Please select a field!', type: 'string' },
                ],
              })(
              <div className="card-list">
                {recruitment_ops.map(el => {
                    return(
                      <div onClick={() => {val(el.type)} }className="card">
                        <header className="card-header">
                          <h2>{el.type}</h2>
                          <p>{el.desc}</p>
                        </header>
                        <div className="card-image">
                          <span class="image-cover">
                            <img></img>
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              )
            }
        </Form.Item>
        </div>
      )
  }

  const WrappedArticleCreate = Form.create({})(collabJoinForms);;
  export default WrappedArticleCreate