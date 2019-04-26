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
        concertthis();
        break;

    case "spotify-this-song":
        spotifythissong();
        break;

    case "movie-this":
        moviethis();
        break;

    case "do-what-it-says":
        dowhatitsays();
        break;
}

function concertthis() {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var venueName = response.data[i].venue.name;
                console.log(venueName);
                var country = response.data[i].venue.country;
                console.log(country);
                var city = response.data[i].venue.city;
                console.log(city);
                var date = moment(response.data[i].datetime).format();
                console.log(date);
            }
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

function spotifythissong() {

    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        console.log(artist);
        var song = data.tracks.items[0].name;
        console.log(song);
        var link = data.tracks.items[0].external_urls.spotify;
        console.log(link);
        var album = data.tracks.items[0].album.name;
        console.log(album);

    });

};

function moviethis() {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value).then(
        function (response) {
            console.log(response.data);
            var Title = response.data.Title;
            console.log(Title);
            var Year = response.data.Year;
            console.log(Year);
            for (var i = 0; i < Ratings.Length; i++){
                // for each Rating{
                
                // }
                var Ratings = response.data.Ratings[i].Source[0];
                console.log(Ratings);
            }
            var Country = response.data.Country;
            console.log(Country);
            var Language = response.data.Language;
            console.log(Language);
            var Plot = response.data.Plot;
            console.log(Plot);
            var Actors = response.data.Actors;
            console.log(Actors);
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

function dowhatitsays() {

}
