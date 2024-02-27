var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect("https://oreoft.github.io/ITMD544-S24/lab-2")
});

module.exports = router;
