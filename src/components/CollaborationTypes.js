import React from 'react';
import {
    Form,
  } from 'antd';

  const collab_ops = [
    {
      type: 'Project',
      desc: 'Build a project from scratch with other mates or join a team'
    },
    {
      type: 'Articles',
      desc: 'Coworking on writting articles for trending topics or for sharing opinions'
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

  const collabTypes = ( {val} ) => {
      return(
        <Form.Item style={{width:"100%"}}>
        <div className="card-list">
          {collab_ops.map(el => {
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
      </Form.Item>
      )
  }

export default Form.create({})(collabTypes);;