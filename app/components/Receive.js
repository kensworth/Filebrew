import React, { Component } from 'react';
import $ from 'jquery';
import Progress from './Progress';
import styles from '../styles/App.css';

class Receive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: this.props.receiving,
      progress: 0
    };
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
  download(fileName, url) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.download = fileName;
      a.href = url;
      a.click(); 
  }
  onTorrent(torrent) {
    const self = this;
    // update progress every 0.1 seconds
    const interval = setInterval(function () {
      self.setState({progress: (torrent.progress * 100).toFixed(1)});
    }, 100);
    torrent.on('done', function () {
      clearInterval(interval);
    })
    // render all files into to the page
    torrent.files.forEach(function (file) {
      file.appendTo('.log');
      file.getBlobURL(function (err, url) {
        if (err) return log(err.message)
        self.setState({
          progress: 100
        });
        self.download(file.name, url)
        self.props.updateReceiving();
      });
    });
  }
  log(str) {
    const p = document.createElement('p');
    p.innerHTML = str;
    document.querySelector('.log').appendChild(p);
  }
  render() {
    return (
      <div className={styles.App}>
        { this.state.downloading && <Progress progress={this.state.progress} /> }
        <div className="log"></div>
      </div>
    );
  }
}

export default Receive;
