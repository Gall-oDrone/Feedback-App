import React from 'react';
import {
    Form,
  } from 'antd';

  const recruitment_ops = [
    {
      type: "Push",
      desc: "If you are willing to collaborate with either another user or a team"
    },
    {
      type: "Pull",
      desc: "If you are looking for people willing to join and collaborate with you in one of your projects"
    }
  ]

  const collabJoinForms = ( {val, pull, props} ) => {
      const { getFieldDecorator, getFieldValue } = props;
      const collab_type = getFieldValue("project_type")
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
                  console.log("ehreno", pull, el.type)
                  if(!pull && el.type === "Pull"){
                    return(
                      <div className="card">
                        <header className="card-header">
                          <h2>{el.type}</h2>
                          <p>{`You do not have any ${collab_type} yet`}</p>
                        </header>
                      </div>
                    )
                  }
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