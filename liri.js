require("dotenv").config(".env");

var keys = require("./keys.js");
//console.log(keys);

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv;
var request = require("request");

//command for finding concerts from a particular artist
if (command[2] === "concert-this") {
    //will search with Bands in Town API
    var artist = command.slice(3).join("");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //console.log(queryURL);

    //making request to the API
    request(queryURL, function(error, response, body) {
        //error occurs
        if(error) {
            console.log(error);
        }

        //request processed successfully
        if( !error && response.statusCode === 200) {
            //console.log("processed request");

            var events = JSON.parse(body);
            //console.log(events);

            //displaying information for each event
            for(var i=0; i<events.length; i++) {
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