const express = require('express');
const router = express.Router();
const md5 = require('md5');

const hashToMagnet = {};

// create md5 digest of magnet URI, using it as the key for the URI in the hashToMagnet key-value store.
router.post('/create-hash', (req, res) => {
	const magnet = req.body.magnet;
	const hash = md5(magnet);
    if (!(hash in hashToMagnet)) {
        hashToMagnet[hash] = magnet;
    }
    res.send({hash});
});

router.post('/retrieve-magnet', (req, res) => {
    const hash = req.body.hash; 
    if (hash in hashToMagnet) {
    	res.send({magnetURI: hashToMagnet[hash]})
    } else {
        res.send(false);
    }
});

module.exports = router;