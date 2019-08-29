require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();
var colors = require('colors');

var userInput = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");


// IF USER CHOOSES 'MOVIE-THIS'
if(userInput=="movie-this")
{
    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
      console.log("\n----Movie Information----\n".bold.underline.bgRed)
      console.log("  (|_|) ")
      console.log("  (-_-) ")
      console.log("<=( 0 ) =>") 
      console.log("(').|.(')\n");
    console.log("Title: ".underline.red + response.data.Title);
    console.log("Release Date: ".underline.yellow + response.data.Year);
    console.log("IMDB Rating: ".underline.cyan + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: ".underline.green + response.data.Ratings[1].Value);
    console.log("Country: ".underline.blue + response.data.Country);
    console.log("Language: ".underline.gray + response.data.Language);
    console.log("Plot: ".underline + response.data.Plot);
    console.log("Actors: ".underline.red + response.data.Actors);
    console.log("\n-------------------------\n".bold.underline.yellow)

  })
}
// IF USER CHOOSES 'CONCERT-THIS'
else if (userInput=="concert-this")
{
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(
  function(response) {
      console.log("\n====Bands In Town Information====\n".bold.underline.bgRed)
      console.log("==== Artist: " + userSearch + " ====")
      for (var i=0;i<5;i++){
          
          console.log("Venue: " + response.data[i].venue.name)
          console.log("Venue Location: " + response.data[i].venue.city)
          console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("---------------------------\n".bold.underline.yellow)
      }
  })
}
// IF USER CHOOSES 'SPOTIFY-THIS-SONG'
else if(userInput=="spotify-this-song"){
    if(!userSearch){
        userSearch="The Sign";
    }
    spotify.search({type: 'track',query: userSearch}).then(function(response){
        console.log("\n====Spotify This Song====\n".bold.underline.bgRed);
        for(var j=0;j<6;j++){
            console.log("Artist: ".underline.red + response.tracks.items[j].artists[0].name);
            console.log("Song Title: ".underline.cyan + response.tracks.items[j].name);
            console.log("Album: ".underline.green + response.tracks.items[j].album.name);
            console.log("Preview Link: ".underline.yellow + response.tracks.items[j].preview_url);
            console.log("---------------------------\n");
        }
    })
}
else
{
    fs.readFile("random.txt","utf8",function(error,data){
        if (error){
            console,log(error);
        }
        var dataArr = data.split(",");
        userInput = dataArr[0];
        userSearch = dataArr[1];
        console.log(dataArr[1])
       
        spotify.search({type:'track',query: userSearch}).then(function(response){
            console.log("\n====Spotify This Song====\n".bold.underline.bgRed);
            for(var j=0;j<5;j++){
                console.log("Artist: ".underline.red + response.tracks.items[j].artists[0].name);
                console.log("Song Title: ".underline.cyan + response.tracks.items[j].name);
                console.log("Album: ".underline.green + response.tracks.items[j].album.name);
                console.log("Preview Link: ".underline.yellow + response.tracks.items[j].preview_url);
                console.log("---------------------------\n");
            }
        })
    })
}