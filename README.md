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
4. Create file config.json in lastfm-booster installation path
5. Run auth.js script and edit config.json
6. Run lastfm-booster

        lastfm-booster --method METHOD [OPTIONS]
        

Getting authorized
==================

Run

        lastfm-booster --method auth

, it will start express server, that will listens on port 3000.


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

        lastfm-booster --method scrobbleRandom --nolog
        
Get users from user "TaggingMachine" and add it to your library. (TaggingMachine has 100k artists)
        
        lastfm-booster --method addToLibrary --user=TaggingMachine
