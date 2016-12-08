import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from '../styles/App.css';

class Progress extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ProgressBar 
        bsStyle="success"
        active
        now={this.props.progress}
        label={this.props.progress + "%"}
      />
    );
  }
}

export default Progress;