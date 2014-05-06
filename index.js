var api = require('lastfmapi')
    , async = require('async')
    , config = require('./config');

// Create a new instance
var lfm = new api(config.lfm);

var mySessionCreds = config.sessionCreds;

lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);

async.forever(
    function (next) {
        lfm.track.scrobble({
            'artist': Math.random().toString(36).substring(7),
            'track': Math.random().toString(36).substring(7),
            'timestamp': Math.floor((new Date()).getTime()  / 1000)
        }, function (err, scrobbles) {

            console.log('We have just scrobbled:', scrobbles);

            setTimeout(function(){ next(err, null) }, 450 + Math.floor(Math.random() * 100) + (Math.random() > .9 ? 1500 : 0));
        });
    },
    function (err) {
        if (err) {
            return console.log('We\'re in trouble', err);
        }
    }
);
