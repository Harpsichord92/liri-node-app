// Access Keys for Spotfy and Twitter
//================================================================
require("dotenv").config();
var key = require('./key.js')

// Packages and Modules
//================================================================
var Spotify = require('node-spotify-api');
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
var movieActors;

var parsedData;

// Functions
//================================================================

function twitterData() {

	// User Authentication
	var client = new twitter(key.twitter);

	// Search Parameters, By Username
	// Returns a maximum of 5 tweets
	var param = {
		screen_name: "harpsichordhk",
		count: 21
	};

	// Gets most recent tweets posted by the user
	//
	client.get('statuses/user_timeline', param, function(error, tweets, response) {

		//If there is no error
		if (!error) {
		
			//Returns 5 of the user's most recent tweets
			for (var i = 1; i <= 20; i++) {
				console.log('Tweet #' + i + ':');
				console.log(tweets[i].text);
				console.log('Created on: ' + tweets[i].created_at);
				console.log('=========================')
			}
		}

		// Else, display an error
		else {
			console.log(error);
		}
	});

}

function spotifyData() {

var spotify = new Spotify(key.spotify);

	// If the user inputs a song
	if (process.argv.length >=4 || typeof userChoice === 'string') {

		//Display spotify song
		spotify.search({type:'track', query: userChoice}, function(err, data) {

			//If there is no error
			if (!err) {
				displaySpotify(data);
			}

			else {
				console.log(err);
			}

		});
	}

	// If user doesn't input a song
	else if (process.argv.length < 4) {

		//Display default song
		spotify.search({type:'track', query: "The Sign Ace of Base" }, function(err, data){

			//If there is no error
			if (!err) {

				//Display Song data
				displaySpotify(data);
			}

			else {
				console.log(err);
			}
		});
	}
}

function displaySpotify(data) {

	// Variables
	var artist = data.tracks.items[1].artists[0].name;
	var track = data.tracks.items[1].name;
	var album = data.tracks.items[1].album.name;
	var songPreview = data.tracks.items[1].external_urls.spotify;

	//Log the information into the terminal
	console.log('Artist: ' + artist);
	console.log('Track: ' + track);
	console.log('Album: ' + album);
	console.log('Song Preview: ' + songPreview);
}

function movieData() {

	if (process.argv.length >=4 || typeof userChoice === 'string')

		request('http://www.omdbapi.com/?t=' + userChoice + '&apikey=trilogy', function(error, response, body) {

			// If there is no error
			if (!error && response.statusCode == 200) {
				parsedData = JSON.parse(body);
				displayMovie(parsedData);
			}

			else {
				console.log(error);
			}

		});

	else if (process.argv.length < 4) {
		request('http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&apikey=trilogy', function(error, response, body) {

			// If there is no error

			if (!error && response.statusCode == 200) {
				parsedData = JSON.parse(body);;
				displayMovie(parsedData);
			}

			else {
				console.log(error);
			}

		});
	}
}

function displayMovie() {

	// Parsed Variables
	var movieTitle = parsedData.Title;
	var movieYear = parsedData.Year;
	var movieimdbRating = parsedData.imdbRating;
	var movieTomatoRating = parsedData.Ratings[1].Value;
	var movieCountry = parsedData.Country;
	var movieLang = parsedData.Language;
	var moviePlot = parsedData.Plot;
	var movieActors = parsedData.Actors;

	//Display movie info
	console.log('Movie Title: ' + movieTitle);
	console.log('Release Date: ' + movieYear);
	console.log('IMDB Rating: ' + movieimdbRating);
	console.log('Rotten Tomatoes Rating: ' + movieTomatoRating)
	console.log('Country: ' + movieCountry);
	console.log('Language: ' + movieLang);
	console.log('Plot: ' + moviePlot);
	console.log('Actors: ' + movieActors);

}

function readData() {

var fs = require('fs');

	fs.readFile('random.txt', 'utf8', function(err, data) {

		// If there is no error
		if (!err) {
			var dataSplit = data.split(',');
			userInput = dataSplit[0];
			userChoice = dataSplit[1];

			switch(userInput) {

				case "my-tweets":
					twitterData();
					break;

				case "spotify-this-song":
					spotifyData();
					break;

				case "movie-this":
					movieData();
					break;
			}
		}

		else {
			console.log(err);
		}

	});
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