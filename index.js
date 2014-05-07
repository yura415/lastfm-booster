'use strict';
var path = require('path')
    , argv = require('optimist').argv
    , fs = require('fs');

var api = require('lastfmapi')
    , config = require(path.join(__dirname, 'config.json'));

var method = argv.method,
    validMethods = fs.readdirSync(path.join(__dirname, 'methods')),
    methodPath = path.join(__dirname, path.join('methods', method));

if (!config || !config.lfm) {
    return console.log('edit config.js file, more information on github.')
}
if (method && validMethods.indexOf(method.trim() + '.js') >= 0) {
    try {
        method = require(methodPath);
    } catch (e) {
        console.log(e);
        return wrongUsage()
    } finally {
        var lfm;
        try {
            lfm = new api(config.lfm);
            var mySessionCreds = config.sessionCreds;
            mySessionCreds && lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);
        } catch (e) {
            console.log("Last.fm initialization error, check your config.js.", e);
        } finally {
            lfm && method && method({
                log: !argv.nolog,
                tag: argv.tag,
                page: argv.page,
                user: argv.user
            }, lfm);
        }
    }
}
else return wrongUsage();

function wrongUsage() {
    console.log(
            "Wrong usage.\n" +
            "Correct is:\n\tlastfm-booster --method METHOD [OPTIONS]\n" +
            "Valid %method%'s are:\n\t" + validMethods.map(function (x) {
            return x.substring(0, x.length - 3)
        }).join("\n\t") +
            "\nDetails on https://github.com/yura415/lastfm-booster"
    );
}