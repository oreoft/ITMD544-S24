var express = require('express');
var router = express.Router();
const redirectUri = process.env.REDIRECT_URI;
const scope = process.env.SCOPE;
const clientId = process.env.CLIENT_ID;


/* GET home page. */
router.get('/', function (req, res, next) {
    // Read username from cookie
    var username = req.cookies.username;

    // Determine if the user is logged in (i.e., if there is a username in the cookie)
    if (username) {
        // If the user is logged in, show username
        res.render('index', {title: "AI Waste Sorting", name: username, button: 'home'});
    } else {
        // Show "visitors" if the user is not logged in.
        res.render('index', {title: "AI Waste Sorting", name: 'visitors', button: 'login'});
    }
});

router.get('/login', function (req, res, next) {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`)
});

router.get('/home', function (req, res, next) {
    res.render('home', {initContent: "Please tell me the name of the garbage you would like to sort.", userName: req.cookies.username});
});

module.exports = router;

