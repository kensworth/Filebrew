import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import dragDrop from 'drag-drop';
import styles from '../styles/App.css';
import Receive from './Receive';
import $ from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);
    this.client = new WebTorrent();
    this.state = {
      receiving: window.location.pathname !== '/'
    }
    this.createTorrent = this.createTorrent.bind(this);
    dragDrop('body', this.createTorrent);
  }
  createTorrent(files) {
    this.client.seed(files, (torrent) => {
      console.log('Client is seeding ' + torrent.magnetURI);
      $.ajax({
        type: 'POST',
        url: '/create-hash',
        data: {
          magnet: torrent.magnetURI
        }
      })
      .done((data) => {
        const URI = document.createTextNode(window.location.href + data.hash);
        document.getElementById('linkArea').appendChild(URI);
      });
    });
  }
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <h2>File Brew</h2>
          <p>Drop a file on the black banner to start seeding!</p>
          <p>Copy/Paste the URL to a friend to share the file. Make sure you keep your browser open!</p>
        </div>
        <div id="linkArea"></div>
        <Receive receiving={this.state.receiving} client={this.client}/>
      </div>
    );
  }
}

export default App;