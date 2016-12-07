import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import dragDrop from 'drag-drop';
import styles from '../styles/App.css';
import coffee from '../../images/coffee.png';
import Receive from './Receive';
import LinkArea from './LinkArea';
import $ from 'jquery';

// TODO: error handling for invalid hashes
// TODO: disallow seeding a new file from a receiving link

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new WebTorrent();
    this.state = {
      receiving: window.location.pathname !== '/',
      URI: ''
    }
    this.createTorrent = this.createTorrent.bind(this);
    this.updateReceiving = this.updateReceiving.bind(this);
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
        this.setState({URI: window.location.href + data.hash});
        document.getElementById('coffee').className = styles.MovingLogo;
      });
    });
  }
  updateReceiving() {
    this.setState({receiving: false});
  }
  render() {
    const firstPrompt = this.state.receiving ? 'Your file is being brewed.' : 'Drop a file into the cup to start seeding.';
    const secondPrompt = this.state.receiving ? 'Please keep your browser open until the download finishes!' : 'Copy/Paste the URL to a friend to share the file. Make sure you keep your browser open!';
 
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <h1>File Brew</h1>
          <p>{firstPrompt}</p>
          <p>{secondPrompt}</p>
          <img src={coffee} id="coffee" className={this.state.receiving ? styles.MovingLogo : styles.StaticLogo} />
        </div>
        { this.state.URI && <LinkArea URI={this.state.URI} /> }
        <Receive receiving={this.state.receiving} client={this.client} updateReceiving={this.updateReceiving.bind(this)} />
      </div>
    );
  }
}

export default App;
