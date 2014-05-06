lastfm-booster
==============

Cheat's last.fm scrobbles

Installation
============

1. Install node.js
        https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
2. Install lastfm-booster via NPM or clone repository instead
        npm install lastfm-booster
    or
        git clone https://github.com/yura415/lastfm-booster
3. Get your app id and secret for last.fm
4. Create file config.js in lastfm-booster installation path
5. Run auth.js script and edit config.js
6. Run lastfm-booster
        lastfm-booster METHOD [OPTIONS]

Aviable methods
===============

* scrobbleRandom
        Scrobbles random strings
* addTag
        Tags artists with it first tag
        Supported options is
            tag
        For example, 
            lastfm-booster addTag --tag=post-rock
        Will search for artists with tag "post-rock" and it will add first artist tag to each artist. Default tag is "under 2000 listeners".