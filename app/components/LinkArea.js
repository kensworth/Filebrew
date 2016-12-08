import React, { Component } from 'react';
import styles from '../styles/App.css';

class LinkArea extends Component {
  constructor(props) {
    super(props);
    this.highlightClick = this.highlightClick.bind(this);
  }
  highlightClick() {
    document.getElementById('linkArea').setSelectionRange(0, 9999);
  }
  render() {
    return (
        <input readOnly type="text" id="linkArea" onClick={this.highlightClick} className={styles.LinkArea} value={this.props.URI} />
    );
  }
}

export default LinkArea;