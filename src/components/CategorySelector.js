import React from 'react';
import { Cascader, Col, Row } from 'antd';

const options = [
  {
    value: '1',
    label: 'Product UI'
  },
  {
    value: '2',
    label: 'Venture Capital'
  },
  {
    value: '3',
    label: 'Information'
  },
  {
    value: '4',
    label: 'Bugs and Fixes'
  },
  {
    value: '5',
    label: 'Other'
  },
];

function onChange(value) {
  console.log(value);
}

// Just show the latest item.
function displayRender(label) {
  // _this.setValue(e.target.value, e);
  console.log("-1) display Render: "+JSON.stringify(label))
  // console.log("-2) display Render: "+JSON.stringify(value))
  console.log("-3) display Render: "+JSON.stringify(label[label.length - 1]))
  // console.log("-4) display Render: "+JSON.stringify(value[0]))
  return label[label.length - 1]
  //  return label.join(' /Mr Corso ');
  // console.log("-2) display Render: "+JSON.stringify(category))
  // if(category.topic !== null){
  //   return category.topic  
  // } else {
  //   return label[label.length - 1];
  // }
}

const CategorySelectorComponent = ({category}) => {
  console.log("0) category: "+JSON.stringify(category))
    return(
        <div style={{ width: 350, height:300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <div style={{ padding: 10 }}>
            <div style={{ marginBottom: '10px' }}>Custom header </div>
            <Row type="flex" justify="space-between">
              <Col>
                <Cascader
                    options={options}
                    expandTrigger="hover"
                    displayRender={displayRender}
                    onChange={(value) => {
                      console.log("1) value: "+JSON.stringify(value))
                      console.log("3) category: "+JSON.stringify(category))
                      console.log("4) category: "+JSON.stringify(typeof(category)))
                      category.topic = value;
                      console.log("5) category: "+JSON.stringify(category))
                      // console.log("6) displayRender: "+JSON.stringify(displayRender))
                  }}
                />
              </Col>
            </Row>
            </div>
        </div>
    );
}

export default CategorySelectorComponent;