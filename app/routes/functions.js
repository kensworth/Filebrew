const express = require('express');
const router = express.Router();
const md5 = require('md5');
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

redis.on('connect', () => {
  console.log('Redis connected!');
});

redis.on('error', (err) => {
  console.log('Error ' + err);
});

// create md5 digest of magnet URI, using it as the key for the redis store
router.post('/create-hash', (req, res) => {
  const magnet = req.body.magnet;
  const hash = md5(magnet);
  redis.set(hash, magnet);
  // expire keys after 24 hours
  redis.expire(hash, 60 * 60 * 24);
  res.send({hash});
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

module.exports = router;
