// Access Keys for Spotfy and Twitter
//================================================================
require("dotenv").config();
var key = require('./key')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Packages and Modules
//================================================================
var spotify = require('spotify');
var twitter = require('twitter');
var request = require('request');

//Global Variables
//================================================================

//User Input
var userInput = process.argv[2];
var userChoice = process.argv[3];

//Movie Information
var movieTitle;
var movieYear;
var movieRating;
var movieCountry;
var movieLang;
var moviePlot;
var movieActor;

var parsedData;

// Functions
//================================================================

function twitterData() {

}

function spotifyData() {

}

function displaySpotify() {

}

function movieData() {

}

function displayMovie() {

}

function readData() {

}

// Main Program
//================================================================

switch(userInput) {

	case "do-what-it-says":
		readData();
		break;

	case "my-tweets":
		twitterData();
		break;

	case "spotify-this-song":
		spotifyData();
		break;

	case "movie-this":
		movieData();
		break;

	default:
		console.log("Error!");

}