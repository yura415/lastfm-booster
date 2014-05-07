var api = require('lastfmapi')
    , express = require('express')
    , config = require('./../config');

// Create a new instance

module.exports = function (params, lfm) {
    var authUrl = lfm.getAuthenticationUrl({ 'cb': 'http://localhost:3000/cb' });
    console.log("open this url in your browser: ", authUrl);

    var app = express();

    app.get('/cb', function (req, res) {
        lfm.authenticate(req.query.token, function (err, session) {
            if (err) {
                throw err;
            }
            res.json(session);
            console.log("use this in your config.js file ", session); // {"name": "LASTFM_USERNAME", "key": "THE_USER_SESSION_KEY"}
        });
    });

    app.listen(3000);
};