import React, { Component } from 'react';
import $ from 'jquery';
import styles from '../styles/App.css';

class Receive extends Component {
  constructor(props) {
    super(props);
    this.props.client.on('error', function (err) {
        console.error('ERROR: ' + err.message)
    });
    this.onTorrent = this.onTorrent.bind(this);
    if (this.props.receiving) {
      $.ajax({
        type: 'POST',
        url: '/retrieve-magnet',
        data: {
          hash: window.location.pathname.slice(1) 
        }
      })
      .done((data) => {
        if (!data) {
          // error handling needed
          console.log('invalid link');
        }
        this.props.client.add(data.magnetURI, this.onTorrent);
      });
    }
  }
  onTorrent(torrent) {
    const self = this;
    self.log('Got torrent metadata!');
    self.log(
      'Torrent info hash: ' + torrent.infoHash + ' ' +
      '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
      '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
    );

    // Print out progress every 5 seconds
    const interval = setInterval(function () {
      self.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
    }, 5000);

    torrent.on('done', function () {
      self.log('Progress: 100%');
      clearInterval(interval);
    })

    // Render all files into to the page
    torrent.files.forEach(function (file) {
      file.appendTo('.log');
      file.getBlobURL(function (err, url) {
        if (err) return log(err.message)
        self.log('File done.');
        self.log('<a href="' + url + '">Download full file: ' + file.name + '</a>');
        self.props.updateReceiving();
      });
    });
  }
  log(str) {
    const p = document.createElement('p');
    p.innerHTML = str;
    document.querySelector('.log').appendChild(p);
  }
  getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  render() {
    return (
      <div className={styles.App}>
        <div className="log"></div>
      </div>
    );
  }
}

export default Receive;
