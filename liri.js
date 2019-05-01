require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');
var request = require('request');

var axios = require("axios");

var action = process.argv[2];
var value = process.argv[3];
// appending to the file log.txt
appendToFile(action, value);
// creating a switch statement 
switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotifyThisSong(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}
// concert-this "Billie Eilish" - example
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var venueName = response.data[i].venue.name;
                outputAndLog("Venue Name: " + venueName);
                var country = response.data[i].venue.country;
                outputAndLog("Country: " + country);
                var city = response.data[i].venue.city;
                outputAndLog("City: " + city);
                var date = moment(response.data[i].datetime).format();
                outputAndLog("Date: " + date);
            }
        },

        function (error) {
            if (error.response) {
                outputAndLog(error.response.data);
                outputAndLog(error.response.status);
                outputAndLog(error.response.headers);
            } else if (error.request) {
                outputAndLog(error.request);
            } else {
                outputAndLog("Error", error.message);
            }
            outputAndLog(error.config);
        }
    );

}
// spotify-this-song "Love Yourself" - example
function spotifyThisSong(value) {
    if (value == null) {
        value = "The Sign";
    }
    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return outputAndLog('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        outputAndLog("Artist: " + artist);
        var song = data.tracks.items[0].name;
        outputAndLog("Song: " + song);
        var link = data.tracks.items[0].external_urls.spotify;
        outputAndLog("Link: " + link);
        var album = data.tracks.items[0].album.name;
        outputAndLog("Album: " + album);

    });

};
// movie-this Mr.Nobody - example
function movieThis(value) {
    if (value == null) {
        value = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value)
        .then(function (response) {
            outputAndLog(response.data);
            var Title = response.data.Title;
            outputAndLog("Title: " + Title);
            var Year = response.data.Year;
            outputAndLog("Year: " + Year);
            for (var i = 0; i < response.data.Ratings.length; i++) {
                var Ratings = response.data.Ratings[i].Source;
                var Value = response.data.Ratings[i].Value;
                if (Ratings === "Internet Movie Database" || Ratings === "Rotten Tomatoes") {
                    outputAndLog("Rating: " + Ratings + " Value: " + Value);
                }
            }
            var Country = response.data.Country;
            outputAndLog("Country: " + Country);
            var Language = response.data.Language;
            outputAndLog("Language: " + Language);
            var Plot = response.data.Plot;
            outputAndLog("Plot: " + Plot);
            var Actors = response.data.Actors;
            outputAndLog("Actors: " + Actors);
        })
        .catch(function (error) {
            if (error.response) {
                outputAndLog(error.response.data);
                outputAndLog(error.response.status);
                outputAndLog(error.response.headers);
            } else if (error.request) {
                outputAndLog(error.request);
            } else {
                outputAndLog("Error", error.message);
            }
            outputAndLog(error.config);
        })
}
// do-what-it-says spotify-this-song,"I Want it That Way" - example
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return outputAndLog(err);
        }
        data = data.split(',');
        if (data[0] === "concert-this") {
            concertThis(data[1]);
        } else if (data[0] === "spotify-this-song") {
            spotifyThisSong(data[1]);
        } else if (data[0] === "movie-this") {
            movieThis(data[1]);
        }
    })
}

function appendToFile(text) {
    fs.appendFile("log.txt", `${text},\n`, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });
}
// creating a function to handle console.log 
function outputAndLog(commend) {
    appendToFile(commend);
    console.log(commend);
}