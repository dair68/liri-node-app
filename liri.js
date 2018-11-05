require("dotenv").config(".env");

var command = process.argv;
var request = require("request");

//command for finding concerts from a particular artist
if (command[2] === "concert-this") {
    var artist = command.slice(3).join("");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //console.log(queryURL);

    //searching for concerts with bands in town API
    request(queryURL, function (error, response, body) {
        //error occurs
        if (error) {
            console.log(error);
        }

        //request processed successfully
        if (!error && response.statusCode === 200) {
            //console.log("processed request");

            var events = JSON.parse(body);
            //console.log(events);

            //displaying information for each event
            for (var i = 0; i < events.length; i++) {
                var event = events[i];

                var venue = event.venue.name;
                var location = event.venue.city + ", " + event.venue.country;

                var moment = require("moment");
                var date = moment(event.datetime).format("L");

                console.log(venue);
                console.log(location);
                console.log(date);
                console.log("\n");
            }
        }
    });
}
//command for finding a song
else if (command[2] === "spotify-this-song") {
    var songQuery;

    //song provided on command line
    if (command.length >= 4) {
        songQuery = command.slice(3).join(" ");
        //console.log(song);
    }
    //defaults to "The Sign" by Ace of Base if no song provided
    else {
        songQuery = "The Sign";
    }

    var keys = require("./keys.js");
    //console.log(keys);

    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);

    //searching for song with spotify api
    spotify.search({ type: 'track', query: songQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data);

        var results = data.tracks.items;
        //console.log(results);

        //regular expression in order to improve search results
        var re = new RegExp(songQuery);

        //displaying search results
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var artists = [];
            var song = result.name;
            var link = result.preview_url;
            var album = result.album.name;

            //console.log(result.artists);
            //console.log(re);

            //making sure song matches query reasonably
            if (re.test(song)) {
                //extracting artist names
                for (var j = 0; j < result.artists.length; j++) {
                    artists.push(result.artists[j].name);
                }

                console.log("Artist(s): " + artists.join(", "));
                console.log("Song: " + song);
                console.log("Preview: " + link);
                console.log("Album: " + album);
                console.log("\n");
            }
        }
    });
}