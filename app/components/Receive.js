import React, { Component } from 'react';
import $ from 'jquery';
import styles from '../styles/App.css';


class Receive extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Receive}>
        	<p>Receive Area!</p>
        </div>
      </div>
    );
  }
}

export default Receive;
