import React, { useEffect, useState } from 'react';
import { Layout, Alert } from "antd";

const { Header } = Layout;
export default class VerifyAccountAlert extends React.Component{
    
    state= {
        showed:false,
        alertClosed: false
    }

  componentDidMount = () => {                   
    this.timerHandle = setTimeout(() => {
      this.setState({ showed: true });    
      this.timerHandle = 0;              
    }, 5000);                            
  };                                     
                                
  componentWillUnmount = () => {                     
    if (this.timerHandle) {                        
        clearTimeout(this.timerHandle);         
    }                                    
  };

  handleCloseAlert = () => {
    this.setState({alertClosed: true})
  }
  handleShow() {
    console.log("surrar")
    clearTimeout(this.timerHandle);         
  }

  render() {
      const { showed, alertClosed } = this.state
        return(
            showed === false && alertClosed === false ?
                    <Header onMouseEnter={() => this.handleShow()}style={{ height: "30px"}}>
                        <Alert 
                            style={{ position:"inline-block", height:"inherit", paddingTop:"2px",marginBottom:"5px",borderRadius: "5px", border: "1px solid #91d5ff", textAlign:"center", width:"inherit", background:"#e6f7ff", color:"black"}}
                            closable
                            onClose={this.handleCloseAlert}
                            id="myDiv"
                            message={
                            <p>Hi! Please confirm your email address by clicking the link in the email we sent you.
                                <a style={{textDecoration: "underline"}} className="resend-email" href={"/confirmation/new/"}> Resend me the link, please</a>
                            </p>
                            } 
                            type="info">
                            {/* <p style={{ lineHeight:"30px"}}>
                                Hi! Please confirm your email address by clicking the link in the email we sent you.
                                <a className="resend-email" href={"/confirmation/new/"}> Resend me the link, please</a>
                                <button id="close" onclick="document.getElementById('myDiv').style.display='none'" >X</button>
                            </p> */}
                        </Alert>
                    </Header>
            : null
        )
    }
}