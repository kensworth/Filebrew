import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import dragDrop from 'drag-drop';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';

const client = new WebTorrent();

dragDrop('body', (files) => {
    client.seed(files, (torrent) => {
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
            document.body.appendChild(URI);
        });
    });
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>File Brew</h2>
                </div>
          </div>
        );
    }
}

export default App;
