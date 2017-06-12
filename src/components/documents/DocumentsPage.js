/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React from 'react';

class DocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: {
        title: '',
        content: '',
      },
      user: {
        name: ''
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const { document } = this.state;
    document.title = event.target.value;
    this.setState({
      document
    });
  }

  onContentChange(event) {
    const { document } = this.state;
    document.content = event.target.value;
    this.setState({
      document
    });
    console.log('This is state', this.state);
  }

  onClickSave(event) {
     alert(`Saving ${this.state.course} changes`);
  }

  render() {
    return (
      <div className="Jumbotron">
        <h1>Documents Page</h1>
        <h2> Add Document </h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.document.title}
        />
        <input
          type="text"
          onChange={this.onContentChange}
          value={this.state.document.content}
        />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

export default DocumentsPage;