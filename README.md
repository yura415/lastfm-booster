lastfm-booster
==============

Cheat's last.fm scrobbles

Installation
============

1. Install node.js

        https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
        
2. Clone this git repository

        git clone https://github.com/yura415/lastfm-booster
        
3. Get your app id and secret from last.fm at http://www.lastfm.ru/api/account/create
4. Create file config.json in lastfm-booster installation path
5. Run auth.js script and edit config.json
6. Run lastfm-booster

        cd lastfm-booster
        node index.js --method METHOD [OPTIONS]
        

Getting authorized
==================

Run

        node index.js --method auth

, it will start http server, that will listens on port 3000.


Aviable methods
===============

* scrobbleRandom

Scrobbles random strings


* addToLibrary

Find artists and add to library.
Supported options is "user".

Examples
========

Scrobble random strings and disable logging

        node index.js --method scrobbleRandom --nolog
        
Get users from user "TaggingMachine" and add it to your library. (TaggingMachine has 100k artists)
        
        node index.js --method addToLibrary --user=TaggingMachine
