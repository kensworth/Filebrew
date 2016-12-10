const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const md5 = require('md5');
let client;

if (process.env.REDISTOGO_URL) {
    const rtg = require('url').parse(process.env.REDISTOGO_URL);
    client = require('redis').createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
} else {
    // running filebrew locally, must run $ redis-server
    client = require('redis').createClient();
}

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