var async = require('async');

module.exports = function (params, lfm) {
    console.log(params);
    var page = 1;
    async.forever(
        function (next) {
            page = page || 1;
            lfm.tag.getTopArtists({
                'tag': params.tag || 'under 2000 listeners',
                'page': page
            }, function (err, topArtists) {
                if (err)
                    next(err, null);
                else {
                    async.every(topArtists, function (artist, callback) {
                        async.series([
                            function (callback) {
                                lfm.album.getTags({
                                    'mbid': artist.mbid
                                }, function (err, tags) {
                                    if (err)
                                        return console.log(err);
                                    callback(err, tags)
                                });
                            },
                            function (tags, callback) {
                                lfm.album.addTags(artist.name, tags[0].name, function (err) {
                                    if (err)
                                        return console.log(err);
                                    callback(err);
                                });
                            }
                        ], function (err, results) {
                            if (err)
                                return console.log(err);
                            page++;
                            callback(err);
                        });
                    }, function (result) {
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