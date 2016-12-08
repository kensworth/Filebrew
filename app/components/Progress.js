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
        active={this.props.progress !== 100}
        now={this.props.progress}
        label={this.props.progress + "%"}
      />
    );
  }
}

export default Progress;