const express = require('express');
const router = express.Router();
const md5 = require('md5');

const hashToMagnet = {};

router.post('/create-hash', (req, res) => {
	const magnet = req.body.magnet;
	const hash = md5(magnet);
    if (!(hash in hashToMagnet)) {
        hashToMagnet[hash] = magnet;
    }
    res.send({hash});
});

module.exports = router;