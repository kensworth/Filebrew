import React, { Component } from 'react';
import $ from 'jquery';
import Progress from './Progress';
import styles from '../styles/App.css';

class Receive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: this.props.seeding,
      progress: 0
    };
    this.props.client.on('error', (err) => {
      console.error('ERROR: ' + err.message);
    });
    this.onTorrent = this.onTorrent.bind(this);
    if (this.props.seeding) {
      $.ajax({
        type: 'POST',
        url: '/retrieve-magnet',
        data: {
          hash: window.location.pathname.slice(1)
        }
      })
      .done((data) => {
        this.props.client.add(data.magnetURI, this.onTorrent);
      });
    }
  }
  download(fileName, url) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = url;
    a.click();
  }
  onTorrent(torrent) {
    const self = this;
    // update progress every 0.2 seconds
    const interval = setInterval(() => {
      const progress = parseInt((torrent.progress * 100).toFixed(1), 10);
      self.setState({progress});
    }, 200);
    torrent.on('done', () => {
      clearInterval(interval);
    });
    // render all files into to the page
    torrent.files.forEach((file) => {
      file.appendTo('.log');
      file.getBlobURL((err, url) => {
        if (err) {
          console.log(err.message);
        }
        self.setState({
          progress: 100
        });
        self.serverLog(file.name, file.length);
        self.download(file.name, url);
        self.props.updateSeeding();
      });
    });
  }
  log(str) {
    const p = document.createElement('p');
    p.innerHTML = str;
    document.querySelector('.log').appendChild(p);
  }
  serverLog(fileName, fileSize) {
    $.ajax({
      type: 'POST',
      url: '/server-log',
      data: {
        fileName,
        fileSize
      }
    });
  }
  render() {
    return (
      <div className={styles.App}>
        { this.state.downloading && <Progress progress={this.state.progress} /> }
        <div className="log" />
      </div>
    );
  }
}

Receive.propTypes = {
  seeding: React.PropTypes.bool,
  client: React.PropTypes.object
};

export default Receive;
