var async = require('async')
    , fs = require('fs')
    , path = require('path');
var names = [],
    pageFile = path.join(__dirname, "/../.lastpage");

function _t(f, t) {
    return setTimeout(f, t);
}

module.exports = function (params, lfm) {
    var pageFromFile;
    try {
        pageFromFile = fs.readFileSync(pageFile);
    } catch(e){
        fs.writeFileSync(pageFile, params.page || 1);
    }
    var page = params.page || pageFromFile || 1;
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
                                _t(function () {
                                    callback(err)
                                }, 300);
                            });
                        }, function (result) {
                            page++;
                            _t(function () {
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
    } catch (e) {
        savePage() ? console.log("page saved") : console.log("page not saved, neh");
        return console.log("ended abnormally, saving page to file. to prevent program from loading last page, just specify --page to 1")
    }
};

process.on('exit', function (code) {
    savePage() ? console.log("page saved") : console.log("page not saved, neh");
    console.log("to prevent program from loading last page, just specify --page to 1")
});

function savePage() {
    return fs.writeFileSync(pageFile, page, null);
}