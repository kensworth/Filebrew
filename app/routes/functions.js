'use strict';
const express = require('express');
const router = express.Router();
const urlGenerator = require('../misc/unique-url-generator.js');

require('dotenv').config();
let redis;

if (process.env.REDISTOGO_URL) {
  const rtg = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]);
} else {
  // running filebrew locally, must run $ redis-server
  redis = require('redis').createredis();
}

redis.on('error', (err) => {
  console.log('Error ' + err);
});

// uses urlGenerator helper file (included at top)
// creates a new unique URL to store as key for the redis store
router.post('/create-hash', (req, res) => {
  const magnet = req.body.magnet;
  urlGenerator().then((url) => {
    redis.set(url, magnet);
    // expire keys after 24 hours
    redis.expire(url, 60 * 60 * 24);
    res.send({hash: url});
  });
});

router.post('/retrieve-magnet', (req, res) => {
  const hash = req.body.hash;
  redis.get(hash, (err, reply) => {
    if (reply) {
      res.send({magnetURI: reply});
    } else {
      res.send(false);
    }
  });
});

router.post('/server-log', (req) => {
  console.log('File finished: ' + req.body.fileName);
  console.log(req.body.fileSize + ' bytes transferred');
});

module.exports = router;
