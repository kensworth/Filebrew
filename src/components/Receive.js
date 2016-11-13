import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';


var client = new WebTorrent()

client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})

function onTorrent (torrent) {
    log('Got torrent metadata!')
    log(
        'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
        '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
    )

    // Print out progress every 5 seconds
    var interval = setInterval(function () {
        log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
    }, 5000)

    torrent.on('done', function () {
        log('Progress: 100%')
        clearInterval(interval)
    })

    // Render all files into to the page
    torrent.files.forEach(function (file) {
        file.appendTo('.log')
        log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)')
        file.getBlobURL(function (err, url) {
            if (err) return log(err.message)
            log('File done.')
            log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
        })
    })
}

function log (str) {
    var p = document.createElement('p')
    p.innerHTML = str
    document.querySelector('.log').appendChild(p)
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

client.add(decodeURIComponent(getCookie('magnet')), onTorrent);

class Receive extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Receive</h2>
                </div>
          </div>
        );
    }
}

export default Receive;
