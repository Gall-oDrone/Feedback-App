import React from 'react';
import {
    Form,
  } from 'antd';

  const collab_ops = [
    {
      type: 'Project',
      desc: 'Request a collaboration pull for your projects or a collaboration push to join an ongoing project'
    },
    {
      type: 'Articles',
      desc: 'Coworking on writting articles for trending topics or for sharing any opinion'
    },
    {
      type: 'Workshop',
      desc: 'Partnership with local or/and foreigns mates so as to bring quality courses and enhacing your learning experience'
    },
    {
      type: 'Research',
      desc: 'Collaborate in important research fields with professionals, industry experts or faculty members'
    },
    // {
    //   type: 'Volunteering',
    //   desc: 'Social inclusion throughout volunteer programs'
    // },
  ]

  const collabTypes = ( {val, props} ) => {
      const { getFieldDecorator } = props;
      return(

        <div>
        <h2>Choose a Collaboration Type</h2>
          <Form.Item style={{width:"100%"}}>
            {getFieldDecorator('project_type', {
            preserve:true,
                rules: [
                  { required: true, message: 'Please select a field!', type: 'string' },
                ],
              })(
              <div className="collab-type-card-list">
                {collab_ops.map(el => {
                    return(
                      <div onClick={() => {val(el.type)} }className="collab-type-card">
                        <header className="collab-type-card-header">
                          <h2>{el.type}</h2>
                          <p>{el.desc}</p>
                        </header>
                        <div className="collab-type-card-image">
                          <span class="collab-type-image-cover">
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

  const WrappedArticleCreate = Form.create({})(collabTypes);;
  export default WrappedArticleCreate