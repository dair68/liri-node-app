require("dotenv").config(".env");

var keys = require("./keys.js");
//console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);