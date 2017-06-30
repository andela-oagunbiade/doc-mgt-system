/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader } from 'react-bootstrap';
import * as documentActions from '../../actions/documentsActions';

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
    const document = Object.assign({}, this.state.document);
    document.title = event.target.value;
    this.setState({
      document
    });
  }

  onContentChange(event) {
    const document = Object.assign({}, this.state.document);
    document.content = event.target.value;
    this.setState({
      document
    });
  }

  onClickSave(event) {
    this.props.actions.createDocument(this.state.document);
  }

  documentRow(document, index) {
    return (
      <div key={index}>
        <div>
          <p>Title: {document.title}</p>
          <p>Content: {document.content}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Jumbotron">
        <PageHeader>Documents Page</PageHeader>
        {this.props.documents.map(this.documentRow)}
        <h3> Add Document </h3>
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

DocumentsPage.propTypes = {
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownprops) {
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
