const express = require('express');
const router = express.Router();
const md5 = require('md5');
const redis = require("redis");
const client = redis.createClient('redistogo-encircled-68018' || 'redis://localhost:6379/');

client.on('ready', function() {
    console.log('Redis ready');
});

client.on('error', function (err) {
    console.log("Error " + err);
});

// create md5 digest of magnet URI, using it as the key for the redis store
router.post('/create-hash', (req, res) => {
	const magnet = req.body.magnet;
	const hash = md5(magnet);
    client.set(hash, magnet);
    res.send({hash});
});

router.post('/retrieve-magnet', (req, res) => {
    const hash = req.body.hash; 
    client.get(hash, (err, reply) => {
        if (reply) {
            res.send({magnetURI: reply})
        } else {
            res.send(false);
        }
    });
});

router.post('/remove-hash', (req, res) => {
    console.log('hit');
});

module.exports = router;