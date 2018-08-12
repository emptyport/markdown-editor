import React, { Component } from 'react';
import Editor from './components/Editor';
import Viewer from './components/Viewer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '# Markdown'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = () => {
    let handler = document.querySelector('.divider');
    let wrapper = handler.closest('.app');
    let box = wrapper.querySelector('.editor');
    let isHandlerDragging = false;

    document.addEventListener('mousedown', function(e) {
      if(e.target === handler) {
        isHandlerDragging = true;
      }
    });

    document.addEventListener('mousemove', function(e) {
      if(!isHandlerDragging) {
        return false;
      }

      let containerOffsetLeft = wrapper.offsetLeft;

      let pointerRelativeXpos = e.clientX - containerOffsetLeft;

      box.style.width = (pointerRelativeXpos - 8)+'px';
      box.style.flexGrow = 0;
    });

    document.addEventListener('mouseup', function(e) {
      isHandlerDragging = false;
    });
  }

  handleTextChange = (text) => {
    this.setState({
      text: text
    });
  }

  render() {
    return (
      <div className="app">
        <Editor text={this.state.text} textCallback={this.handleTextChange} />
        <div className="divider" />
        <Viewer text={this.state.text} />
      </div>
    );
  }
}

export default App;
