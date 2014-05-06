var async = require('async');
var names = [];


module.exports = function (params, lfm) {
    console.log(params);
    var page = params.page || 1;
    async.forever(
        function (next) {
            lfm.library.getArtists({
                'user': params.user || 'TaggingMachine',
                'page': page
            }, function (err, topArtists) {
                if (err)
                    next(err, null);
                else {
                    async.every(topArtists.artist, function (artist, callback) {
                        if (names.indexOf(artist.name) >= 0)
                            console.log('sas! ', artist.name);
                        else
                            names.push(artist.name);
                        lfm.library.addArtist(artist.name, function (err) {
                            if (err) {
                                console.log(artist.name, err);
                            }
                            else if (params.log)
                                console.log(artist.name, 'was successfully added to library');
                            callback(err);
                        });
                    }, function (result) {
                        params.log && console.log(result);
                        page++;
                        setTimeout(function () {
                            next(err, null)
                        }, 450 + Math.floor(Math.random() * 100) + (Math.random() > .9 ? 1500 : 0));
                    });
                }
            });
        },
        function (err) {
            if (err) {
                return console.log('We\'re in trouble', err);
            }
        }
    );
};