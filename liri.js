require("./.gitignore/node_modules/dotenv").config({path:".gitignore/.env"});

var keys = require("./keys.js");
//console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);