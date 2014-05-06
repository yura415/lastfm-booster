var api = require('lastfmapi')
    , express = require('express')
    , config = require('./config');

// Create a new instance
var lfm = new api(config.lfm);

var authUrl = lfm.getAuthenticationUrl({ 'cb': 'http://localhost:3000/cb' });
console.log(authUrl);

var app = express();

app.get('/cb', function (req, res) {
    lfm.authenticate(req.query.token, function (err, session) {
        if (err) {
            throw err;
        }
        res.json(session);
        console.log(session); // {"name": "LASTFM_USERNAME", "key": "THE_USER_SESSION_KEY"}
    });
});

app.listen(3000);