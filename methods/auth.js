module.exports = function (params, lfm) {
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        var token = req.url.substr(req.url.indexOf("=") + 1, 32);

        lfm.authenticate(token, function (err, session) {
            if (err) {
                res.end('itwasaerroriswear!!1');
                return console.log(err);
            }
            var obj = require(__dirname + "/../config.json");
            obj.sessionCreds = session;
            res.end('Paste this in your config.json file:\n' + JSON.stringify(obj));
            return console.log("use this in your config.js file ", session); // {"name": "LASTFM_USERNAME", "key": "THE_USER_SESSION_KEY"}
        });
    }).listen(params.port || 3000, 'localhost');

    var authUrl = lfm.getAuthenticationUrl({ 'cb': 'http://localhost:3000/cb' });
    console.log("open this url in your browser: ", authUrl);
};