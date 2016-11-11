'use strict';
// Grab dependencies
const express = require('express');
const chalk = require('chalk'); // Chalk was added by create-react-app, use only on the dev side
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');

// load up our environment variables
require('dotenv').load();

const PORT = process.env.PORT || 3000;

// Grab webpack dev config file from react-scripts
const webpackConfig = require('../node_modules/react-scripts/config/webpack.config.dev');

// Initialize Compiler with the webpackConfig
const compiler = webpack(webpackConfig);

// Initialize express
const app = express();

// Initialize the server by creating a new instance of webpackDevServer
const server = new webpackDevServer(compiler, {
    noInfo: true,
    setup: (app) => {
        // ignore favicon such that cookie doesn't get changed
        app.get('/favicon.ico', function(req, res) {
                res.sendStatus(200);
        });

        app.get('/:magnet', (req, res) => {
            const magnet = req.originalUrl;
            res.cookie('magnet', magnet);
            res.sendFile(path.join(__dirname, '../src', 'receive.html'));
        });
    }
});

// Start up our server
server.listen(PORT, (error) => {
    if (error) throw error;
    console.log(chalk.green('Webpack Server is listening on port'), PORT);
});
