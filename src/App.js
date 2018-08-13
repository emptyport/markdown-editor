import React, { Component } from 'react';
import Editor from './components/Editor';
import Viewer from './components/Viewer';

class App extends Component {
  constructor(props) {
    let initialText = 
`# Markdown Editor

## By Michael Porter

I created this markdown editor as part of the [freeCodeCamp curriculum](https://www.freecodecamp.org/). The markdown to HTML conversion is handled by [Marked.js](https://marked.js.org/#/README.md#README.md).

This was actually a super simple site to create. The entire viewer component is as follows thanks to the \`convertMarkdown\` function which handles the conversion:

\`\`\`javascript
import React, { Component } from 'react';
import marked from 'marked';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.convertMarkdown = this.convertMarkdown.bind(this);
  }

  convertMarkdown = () => {
    return {__html: marked(this.props.text)};
  }

  render() {
    return (
      <div id="preview" 
           className="viewer"
           dangerouslySetInnerHTML={this.convertMarkdown()}
      />
    );
  }
}

export default Viewer;
\`\`\`

You can create
* lists
* **bold text**
* and add images ![Chemistry icon](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gnome-applications-science.svg/48px-Gnome-applications-science.svg.png)

> Feel free to try it out!
`;


    super(props);
    this.state = {
      text: initialText
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
