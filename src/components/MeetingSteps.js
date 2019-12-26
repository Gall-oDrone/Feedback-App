import React from 'react';
import { Steps, Button, message } from 'antd';
import CalendarComponent from './Calendar';
import CategoryComponent from './CategorySelector';
import FileUploader from './FileUploader';
import IncentivesOptions from './IncentivesOptions';

const { Step } = Steps;

const steps = [
  {
    title: 'Schedule a meeting',
    content: <CalendarComponent/>,
  },
  {
    title: 'Choose a discussion topic',
    content: <CategoryComponent/>,
  },
  // {
  //   title: 'Upload files (Optional)',
  //   content: <FileUploader/>,
  // },
  {
    title: 'Book',
    content: 'Last-content',
  },
];

class MeetingSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <br/>
        <div className="steps-content">{steps[current].content}</div>
        <br/>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default MeetingSteps;