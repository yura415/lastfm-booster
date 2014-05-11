module.exports = function (params, lfm) {
    'use strict';
    var delayMultiplier = parseFloat(params.delayMultiplier) || 1.0;
    var async = require('async')
        , fs = require('fs')
        , path = require('path');

    var page
        , pageFile = path.join(__dirname, "/../.lastpage");

    function _t(f, t) {
        return setTimeout(f, t);
    }

    var pageFromFile;
    try {
        pageFromFile = fs.readFileSync(pageFile);
    } catch (e) {
        fs.writeFileSync(pageFile, params.page || 1);
    }
    page = params.page || pageFromFile || 1;
    try {
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
                            lfm.library.addArtist(artist.name, function (err) {
                                if (err) {
                                    console.log(artist.name, err);
                                }
                                else if (params.log)
                                    console.log(artist.name, 'was successfully added to library');
                                _t(function () {
                                    callback(err)
                                }, 300*delayMultiplier);
                            });
                        }, function (result) {
                            page++;
                            params.log && console.log("\n\n\tWe are on page " + page + " now.\n\n");
                            _t(function () {
                                next(err, null)
                            }, 450*delayMultiplier + Math.floor(Math.random() * 100) + (Math.random() > .9 ? 1500 : 0));
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
    } catch (e) {
        savePage();
        return console.log("ended abnormally, saving page to file. to prevent program from loading last page, just specify --page to 1")
    }

    process.on('exit', function (code) {
        savePage();
        console.log("to prevent program from loading last page, just specify --page to 1")
    });

    function savePage() {
        try {
            fs.writeFileSync(pageFile, page, null);
        } catch (e) {
            return console.log("page not saved, neh");
        }
        console.log("page saved");
    }
};