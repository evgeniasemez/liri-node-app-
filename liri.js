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
// something about catch instead of then
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var venueName = response.data[i].venue.name;
                console.log("Venue Name: " + venueName);
                var country = response.data[i].venue.country;
                console.log("Country: " + country);
                var city = response.data[i].venue.city;
                console.log("City: " + city);
                var date = moment(response.data[i].datetime).format();
                console.log("Date: " + date);
            }
            // appending it to "do-what-it-says"
            appendToFile(`concert-this,${value}`);
        },

        function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );

}
// spotify-this-song "Love Yourself" - example
function spotifyThisSong(value) {
    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        console.log("Artist: " + artist);
        var song = data.tracks.items[0].name;
        console.log("Song: " + song);
        var link = data.tracks.items[0].external_urls.spotify;
        console.log("Link: " + link);
        var album = data.tracks.items[0].album.name;
        console.log("Album: " + album);

    });
    // appending it to "do-what-it-says"
    appendToFile(`spotify-this-song,${value}`);

};
// movie-this Mr.Nobody - example
function movieThis(value) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value)
        .then(function (response) {
            console.log(response.data);
            var Title = response.data.Title;
            console.log("Title: " + Title);
            var Year = response.data.Year;
            console.log("Year: " + Year);
            for (var i = 0; i < response.data.Ratings.length; i++) {
                var Ratings = response.data.Ratings[i].Source;
                var Value = response.data.Ratings[i].Value;
                if (Ratings === "Internet Movie Database" || Ratings === "Rotten Tomatoes") {
                    console.log("Rating: " + Ratings + " Value: " + Value);
                }
            }
            var Country = response.data.Country;
            console.log("Country: " + Country);
            var Language = response.data.Language;
            console.log("Language: " + Language);
            var Plot = response.data.Plot;
            console.log("Plot: " + Plot);
            var Actors = response.data.Actors;
            console.log("Actors: " + Actors);

            // appending it to "do-what-it-says"
            appendToFile(`movie-this,${value}`);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}
// do-what-it-says spotify-this-song,"I Want it That Way" - example
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(',');
        if (data[0] === "concert-this") {
            concertThis(data[1]);
        } else if (data[0] === "spotify-this-song") {
            console.log(`sending ${data[1]} to spotify-this-song`);
            spotifyThisSong(data[1]);
        } else if (data[0] === "movie-this") {
            movieThis(data[1]);
        }
    })
}

function appendToFile(text) {
    fs.appendFile("random.txt", `,${text}`, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });
}