import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import dragDrop from 'drag-drop';
import styles from '../styles/App.css';
//import logo from '../../images/swirl.svg';
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
        //document.getElementById('logo').className = styles.MovingLogo;
      });
    });
  }
  render() {
    const firstPrompt = this.state.receiving ? 'Your file is being brewed.' : 'Drop a file on the black banner to start seeding.' 
    const secondPrompt = this.state.receiving ? 'Please keep your browser open until the download finishes!' : 'Copy/Paste the URL to a friend to share the file. Make sure you keep your browser open!'
    //<img src={logo} id="logo" className={this.state.receiving ? styles.MovingLogo : styles.StaticLogo} alt="logo" />
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <h2>File Brew</h2>
          <p>{firstPrompt}</p>
          <p>{secondPrompt}</p>
        </div>
        <div id="linkArea" className={styles.LinkArea}></div>
        <Receive receiving={this.state.receiving} client={this.client}/>
      </div>
    );
  }
}

export default App;
