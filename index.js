var api = require('lastfmapi')
    , config = require('./config')
    , argv = require('optimist').argv
    , path = require('path')
    , fs = require('fs');

// Create a new instance

var method = argv.method,
    validMethods = fs.readdirSync(path.join(__dirname, 'methods'));

if (method && validMethods.indexOf(method.trim() + '.js') >= 0) {
    try {
        method = require(path.join(__dirname, path.join('methods', method)));
    } catch (e) {
        console.log(e);
        return wrongUsage()
    } finally {
        var lfm;
        try {
            lfm = new api(config.lfm);
            var mySessionCreds = config.sessionCreds;
            lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);
        } catch (e) {
            console.log("Last.fm initialization error, check your config.js.", e);
        } finally {
            console.log(method);
            lfm && method && method({
                log: !argv.nolog,
                tag: argv.tag
            }, lfm);
        }
    }
}
else return wrongUsage();

function wrongUsage() {
    console.log(
            "Wrong usage.\n" +
            "Correct is:\n\tlastfm-booster %method%\n" +
            "Valid %method%'s are:\n\ttagUnder2k\n\tscrobbleRandom\n" +
            "Details on https://github.com/yura415/lastfm-booster"
    );
}