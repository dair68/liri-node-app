# liri-node-app
LIRI, a Language Interpretation and Recognition Interface. A command line node app that let's the user search for information on songs, concerts, and movies.

This application requires node, which can be downloaded from https://nodejs.org/en/ if needed.

###Getting started
1. After cloning the git repository to your local machine, navigate to the directory containing the files using terminal/bash. Type in `npm install` on the command line to install the node_modules folder needed to run the app.

2. Obtain a **Client ID** and **Client Secret** from the Spotify API. You will need to create a Spotify account if you do not already have one. A free one will work. Once you have an account, head over to https://developer.spotify.com/documentation/general/guides/authorization-guide/ and follow the instructions under "To Obtain Authorization".      

3. Within the same directory, create a .env file. The easiest way to do this is typing in `touch .env` in the from terminal/bash.

4. Open up the .env file within some sort of code editor. Copy and paste the following into the file:

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

your-spotify-id and your-spotify-secret are of course the **Client ID** and **Client Secret** obtained in step 2.

5. Test if everything is working by typing in `node liri.js spotify-this-song` into terminal/bash command line within the appropriate directory. If the previous steps were performed properly, the console should output data for "The Sign" by Ace of Base.


###Using liri
Searching up a band
-Type in `node liri.js concert-this name_of_band` into the command line to obtain a list of upcoming concerts for a band, with lists of venues, countries, and dates.

Searching up a song
-Type in `node liri.js spotify-this-song "song_name"` into the command line to obtain spotify data on a certain song. Will output a list of best matching songs to the console, with stats on album, artist, and a preview link. Will default to showing "The Sign" by Ace of Base if no song title provided

Searching up a movie
-Type in `node liri.js movie-this "movie_name"` into the command line to obtain stats on particular movie, including year, actors, and a plot synopsis. Will default to showing stats for "Mr Nobody" if no movie name provided.

Executing a command from a .txt file
-Type in `node liri.js do-what-it-says` into the command line to execute the command specified in the random.txt file. First instance, if the random.txt says `spotify-this-song,"I Want it That Way"`, the app runs the `spotify-this-song` command on "I Want it That Way". In general, random.txt should contain the text

`node_command, what_your_searching_for` 

where node_command is `concert-this`, `spotify-this-song` or `movie-this`, and what_your_searching_for is a band, song, or movie respectively. The command and query MUST be separated by a single comma, and only one command/query pair may be present in the file.

