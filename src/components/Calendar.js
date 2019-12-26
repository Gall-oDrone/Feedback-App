import React from 'react';
import { Calendar, DatePicker, Select, Radio, Col, Row } from 'antd';

const { Group, Button } = Radio;
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const CalendarComponent = () => {
    return (
  <div style={{ width: 350, height:300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <div style={{ padding: 10 }}>
            <div style={{ marginBottom: '10px' }}>Custom header </div>
            <Row type="flex" justify="space-between">
              <Col>
                <DatePicker style={{ width: 300 }} showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />
              </Col>
            </Row>
          </div>
    {/* <Calendar
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current.month(i);
          months.push(localeData.monthsShort(current));
        }

        for (let index = start; index < end; index++) {
          monthOptions.push(
            <Select.Option className="month-item" key={`${index}`}>
              {months[index]}
            </Select.Option>,
          );
        }
        const month = value.month();

        const year = value.year();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <Select.Option key={i} value={i} className="year-item">
              {i}
            </Select.Option>,
          );
        }
        return (
          <div style={{ padding: 10 }}>
            <div style={{ marginBottom: '10px' }}>Custom header </div>
            <Row type="flex" justify="space-between">
              <Col>
                <DatePicker style={{ width: 300 }} showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />
              </Col>
            </Row>
          </div>
        );
      }}
      // onPanelChange={onPanelChange}
    /> */}
  </div>
    )
    };

    export default CalendarComponent;