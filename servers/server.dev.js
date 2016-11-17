'use strict';
// Grab dependencies
const express = require('express');
const chalk = require('chalk'); // Chalk was added by create-react-app, use only on the dev side
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const md5 = require('md5');
const bodyParser = require('body-parser');

// load up our environment variables
require('dotenv').load();

const PORT = process.env.PORT || 3000;

// Grab webpack dev config file from react-scripts
const webpackConfig = require('../webpack.config.js');

// Initialize Compiler with the webpackConfig
const compiler = webpack(webpackConfig);

// Initialize express
const app = express();

// turn into LRU cache
let hashToMagnet = {};

// Initialize the server by creating a new instance of webpackDevServer
const server = new webpackDevServer(compiler, {
    noInfo: true,
    setup: (app) => {
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        // ignore favicon such that cookie doesn't get changed
        app.get('/favicon.ico', (req, res) => {
                res.sendStatus(200);
        });

        /*
        app.get('/:magnet', (req, res) => {
            const hash = req.originalUrl.slice(1);
            if (hash in hashToMagnet) {
                res.cookie('magnet', hashToMagnet[hash]);
                res.sendFile(path.join(__dirname, '../src/components', 'receive.html'));
            } else {
                res.send('file does not exist');
            }
        });
        */

        app.post('/create-hash', (req, res) => {
            const magnet = req.body.magnet;
            const hash = md5(magnet);
            if (!(hash in hashToMagnet)) {
                hashToMagnet[hash] = magnet;
            }
            console.log(hashToMagnet);
            res.send({hash});
        });

    }
});

// Start up our server
server.listen(PORT, (error) => {
    if (error) throw error;
    console.log(chalk.green('Webpack Server is listening on port'), PORT);
});
