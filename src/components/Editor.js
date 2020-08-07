import React, {Component} from 'react';
import { render } from 'react-dom';
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "../assets/editor.css";
import debounce from 'lodash/debounce';

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}


class EditorContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editorState: null
     };
  }

  saveContent = debounce((content) => {
    fetch('/content', {
      method: 'POST',
      body: JSON.stringify({
        content: convertToRaw(content),
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }, 1000);

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.props.content(JSON.stringify(convertToRaw(contentState)));
    this.setState({
      editorState,
    });
  }

  componentDidMount() {
    fetch('/content').then(val => val.json())
    .then(rawContent => {
      if (rawContent) {
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    });
  }

  render(){
    const { editorState } = this.state;
    const { content } = this.props;
    // if (!editorState) {
    //   return (
    //     <h3 className="loading">Loading...</h3>
    //   );
    // }
    return (
      <body id="editor-body">
          <div className='editor'>
            <Editor
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange.bind(this)}    
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
              }}
            />
          </div>
      </body>
    )
  }
}

export default EditorContainer