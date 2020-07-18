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
  const selected = date_to_appointment.date
    return (
            <div style={{ width: 350, height:300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
              <div style={{ padding: 10 }}>
                        <Row type="flex" justify="space-between">
                          <Col>
                            <DatePicker style={{ width: 300 }} 
                              format="YYYY-MM-DD HH:mm" 
                              defaultValue={selected !== null ? moment(selected) : null}
                              showTime placeholder="Select Time" 
                              onChange={(value, dateString) => {
                                if(value === null){
                                  date_to_appointment.date = null
                                } else{
                                  date_to_appointment.date = moment(value._d).format();
                                }
                                console.log("3) date_to_appointment: "+JSON.stringify(date_to_appointment))
                              }}
                              disabledDate={(current) => {
                                return moment().add(-1, 'days')  >= current ||
                                    moment().add(1, 'month')  <= current;
                                }}
                            />
                          </Col>
                        </Row>
              </div>
            </div>
    )
    };

    export default CalendarComponent;