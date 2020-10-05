import React from 'react';
import "../assets/profilepic.css"
import { Icon } from "antd";
class ProfilePicUploader extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            selectedFile: null,
        };
        this.fileUploader = React.createRef();
        this.imgFile = React.createRef();
    }

    handleProfilePic = (e) =>{
        this.refs.fileUploader.click();
    }
    readURL = (e) => {
        e.preventDefault();
        const { profile_pic } = this.props;
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            var img = this.refs.imgFile;
            reader.onloadend = function () {
                console.log("ALO II");
                img.src = reader.result
            }
    
            reader.readAsDataURL(e.target.files[0]);
            console.log("ALO I: ", e.target.files);
            this.setState({selectedFile: e.target.files[0]});
            profile_pic(e.target.files[0])
        } else {
            console.log("ERROR")
        }
    }        

  render(){
      const { selectedFile } = this.state
      const { profile_pic, form } = this.props
    return(
        <div className="row">
            <div className="small-12 medium-2 large-2 columns">
            <div className="circle">
                <img className="profile-pic" ref="imgFile" src={selectedFile} alt={selectedFile}/>
                <i className="fa fa-user fa-5x"></i>
            </div>
            <div className="p-image">
                {/* <i className="fa fa-camera upload-button"></i> */}
                <Icon 
                    onClick={(e) => {this.handleProfilePic(e)}}
                    onChange={(e) => {this.handleChangePic(e)}}
                    type="camera" className="fa fa-camera upload-button"></Icon>
                <input className="file-upload" ref="fileUploader" id="file"  onChange={this.readURL.bind(this)} type="file" accept="image/*"/>
            </div>
            </div>
        </div>
    )
  }
  }
  
  export default ProfilePicUploader