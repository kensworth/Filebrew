import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import dragDrop from 'drag-drop';
import styles from '../styles/App.css';
import coffee from '../../images/coffee.png';
import Receive from './Receive';
import LinkArea from './LinkArea';
import $ from 'jquery';

// TODO: fix prod build
// TODO: error handling for invalid hashes
// TODO: disallow seeding a new file from a receiving link

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new WebTorrent();
    this.state = {
      seeding: window.location.pathname !== '/'
    };
    this.createTorrent = this.createTorrent.bind(this);
    this.updateSeeding = this.updateSeeding.bind(this);
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
        this.setState({
          hash: data.hash,
          torrent: torrent,
          URI: window.location.href + data.hash,
          seeding: true
        });
      });
    });
  }
  updateSeeding() {
    this.setState({seeding: false});
  }
  render() {
    const firstPrompt = this.state.seeding ? 'Your file is being brewed.' : 'Drop a file into the cup to start seeding.';
    const secondPrompt = this.state.seeding ? 'Please keep your browser open until the download finishes!' : 'Copy/Paste the URL to a friend to share the file. Make sure you keep your browser open!';
    const coffeeStyle = this.state.seeding ? [styles.StaticLogo, styles.MovingLogo].join(' ') : styles.StaticLogo;
 
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <h1>File Brew</h1>
          <p>{firstPrompt}</p>
          <p>{secondPrompt}</p>
          <img src={coffee} id="coffee" className={coffeeStyle} />
        </div>
        { this.state.URI && <LinkArea URI={this.state.URI} /> }
        <Receive seeding={this.state.seeding} client={this.client} updateSeeding={this.updateSeeding.bind(this)} />
      </div>
    );
  }
}

export default App;
