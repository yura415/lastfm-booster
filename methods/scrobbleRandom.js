var async = require('async');

module.exports = function (params,lfm ) {
    async.forever(
        function (next) {
            var artist = Math.random().toString(36).substring(7)
                , track = Math.random().toString(36).substring(7);
            lfm.track.scrobble({
                'artist': artist,
                'track': track,
                'timestamp': Math.floor((new Date()).getTime() / 1000) + Math.floor(Math.random() * 1000) - 500
            }, function (err, scrobbles) {
                params.log && console.log('We have just scrobbled:', scrobbles);
                setTimeout(function () {
                    next(err, scrobbles)
                }, 450 + Math.floor(Math.random() * 100) + (Math.random() > .9 ? 1500 : 0));
            });
        },
        function (err) {
            if (err) {
                return console.log('We\'re in trouble', err);
            }
        }
    );
};