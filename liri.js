require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

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

}

function moviethis() {

}

function dowhatitsays() {

}

// var fs = require("fs");

// var action = process.argv[2];
// var value = process.argv[3];

// switch (action) {
//     case "total":
//         total();
//         break;

//     case "deposit":
//         deposit();
//         break;

//     case "withdraw":
//         withdraw();
//         break;

//     case "lotto":
//         lotto();
//         break;
// }
// function total() {
//     fs.readFile("bank.txt", "utf8", function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         data = data.split(", ");
//         var result = 0;

//         for (var i = 0; i < data.length; i++) {
//             if (parseFloat(data[i])) {
//                 result += parseFloat(data[i]);
//             }
//         }
//         console.log("You have a total of " + result.toFixed(2));
//     });
// }
// function deposit() {
//     fs.appendFile("bank.txt", ", " + value, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     });
//     console.log("Deposited " + value + ".");
// }
// function withdraw() {
//     fs.appendFile("bank.txt", ", -" + value, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     });
//     console.log("Withdrew " + value + ".");
// }
// function lotto() {
//     fs.appendFile("bank.txt", ", -.25", function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     });

//     var chance = Math.floor((Math.random() * 10) + 1);

//     if (chance === 1) {
//         fs.appendFile("bank.txt", ", 2", function (err) {
//             if (err) {
//                 return console.log(err);
//             }
//         });
//         console.log("Congrats you won the lottery!");
//     }
//     else {
//         console.log("Sorry. You just lost 25 cents.");
//     }
// }