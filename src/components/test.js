import React from 'react';
// import logo from './logo.svg';
import '../assets/App.css';
import '../assets/index.css';
import VideoCallFrame from './VideoFrame';

class App2 extends React.Component {
  render() {
      return (
        <div className="App">

          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>

            <VideoCallFrame url={"https://testwebapp.daily.co/hello"}/>

          </header>

      </div>
      )    
  }

}

export default App2;