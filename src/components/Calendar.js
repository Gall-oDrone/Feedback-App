import React from 'react';
import { Calendar, DatePicker, Select, Radio, Col, Row } from 'antd';
import moment from "moment";
const { Group, Button } = Radio;
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function value_to_date(value){
  return
}

function onOk(value, dta) {
  console.log('onOk: ', value);
  // console.log('date_to_appointment: ', dta);
  // console.log('value_to_date(value): ', value_to_date(value));
  return value
}

function onPanelChange(value, mode) {
  console.log(value, mode);
}



const CalendarComponent = ({date_to_appointment}) => {
  console.log("1) date_to_appointment: "+JSON.stringify(date_to_appointment))
  // console.log("2) props: "+JSON.stringify(this.props))
  // console.log("2) props: "+JSON.stringify(date_to_appointment))
  // const { userAnswer } = this.props;
  // disabledSubmissionDate = (submissionValue) => {
  //   if (!submissionValue) {
  //       return false;
  //   }
  //   return (submissionValue.valueOf() < Date.now()) || (submissionValue.valueOf() >= moment().add(1, 'month'));
  // }
  let corso = ''
    return (
  <div style={{ width: 350, height:300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <div style={{ padding: 10 }}>
            <div style={{ marginBottom: '10px' }}>Custom header </div>
            <Row type="flex" justify="space-between">
              <Col>
                <DatePicker style={{ width: 300 }} 
                format="YYYY-MM-DD HH:mm" 
                showTime placeholder="Select Time" 
                onChange={onChange} 
                disabledDate={(current) => {
                  return moment().add(-1, 'days')  >= current ||
                       moment().add(1, 'month')  <= current;
                  }}
                onOk={(value, dateString) => {
        date_to_appointment.date = moment(value._d).format();
        console.log("3) date_to_appointment: "+JSON.stringify(value._d.valueOf()))
        console.log("4) date_to_appointment: "+JSON.stringify(date_to_appointment))
    }} />
              </Col>
            </Row>
    </div>
  </div>
    )
    };

    export default CalendarComponent;