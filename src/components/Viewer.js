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
      <div id="preview" className="viewer" dangerouslySetInnerHTML={this.convertMarkdown()}/>
    );
  }
}

export default Viewer;