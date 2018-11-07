require("dotenv").config(".env");

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
var request = require("request");

//command for executing the command in random.txt
if (command === "do-what-it-says") {
    var fs = require("fs");

    //extracting command and search request from file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            err;
        }

        //console.log(data);
        var dataParts = data.split(",");
        var txtCommand = dataParts[0].trim();
        var txtQuery = dataParts[1].trim();

        //console.log(query);
        search(txtCommand, txtQuery);
    });
}
//a command specified in terminal
else {
    search(command, query);
}


//takes in a command and query, and executes appropriate function to fetch data
function search(command, query) {
    if(command === "concert-this") {
        searchBand(query);
    }
    //song search
    else if (command === "spotify-this-song") {
        //no song provided. defaulting to "The Sign" by Ace of Base
        if (query === undefined) {
            query = "The Sign";
        }
        searchSong(query);
    }
    //movie search
    else if (command === "movie-this") {
        //no movie provided. defaulting to "Mr Nobody"
        if(query === undefined) {
            query = "Mr Nobody";
        }
        searchMovie(query);
    }
    //command not recognized
    else {
        console.log("command not recognized");
    }
}

//searches for concerts for a band using bands in town API. Outputs search results to console.
function searchBand(bandQuery) {
    console.log("searching concerts");
    var queryURL = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp";
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

                console.log("\n");
                console.log(venue);
                console.log(location);
                console.log(date);
            }
        }
    });
}

//searches for a song using the spotify api. Outputs search results to console.
function searchSong(songQuery) {
    console.log("searching song");

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

        //creating regular expression in order to improve search results
        var words = (songQuery.replace(/"/g, "")).split(" ");

        //setting up words for regular expression
        for (var i = 0; i < words.length; i++) {
            var word = words[i];

            var lower = word[0].toLowerCase();
            var upper = word[0].toUpperCase();

            words[i] = "[" + lower + upper + "]" + (word.substring(1)).toLowerCase();
        }

        //a regular expression that matches a title containing same substring of words. not case-sensitive
        var re = new RegExp(words.join(" "));
        //console.log(words.join(" "));

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

                console.log("\n");
                console.log("Artist(s): " + artists.join(", "));
                console.log("Song: " + song);
                console.log("Preview: " + link);
                console.log("Album: " + album);
            }
        }
    });
}

//searches for a movie using the omdb api
function searchMovie(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    //console.log(queryURL);

    //searching for movie with omdb api
    request(queryURL, function (error, response, body) {
        //if error occurs
        if (error) {
            console.log(error);
        }

        //request processed successfully
        if (!error && response.statusCode === 200) {
            //console.log(JSON.parse(body));
            var result = JSON.parse(body);

            var title = result.Title;
            var year = result.Year;
            var rating1 = result.imdbRating;
            var rating2 = result.Ratings[1].Value;
            var country = result.Country;
            var language = result.Language;
            var plot = result.Plot;
            var actors = result.Actors;

            console.log("\n");
            console.log("Movie: " + title);
            console.log("Year: " + year);
            console.log("IMDB Rating: " + rating1);
            console.log("Rotten Tomatos Rating: " + rating2);
            console.log("Countries of production: " + country);
            console.log("Language(s): " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
        }
    });
}