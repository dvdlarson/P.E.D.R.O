require("dotenv").config();
var inquirer=require("inquirer");
var keys=require("./keys.js");
var Spotify=require("node-spotify-api");
var Twitter=require("twitter");
var request=require("request");


function getAction(){
    inquirer.prompt({
        type: "list",
      message: "What would you like to do?",
      choices: ["See my last 20 Tweets", "Play a song on Spotify", "Get Movie Info","Do a random thing"],
      name: "action"
    }).then(function(response){
    if(response.action=="See my last 20 Tweets"){
        var tweetArray=getMyTweets();
        for (var i=0;i<tweetArray.length;i++){
            console.log("tweet info");
        }
    }
    else if(response.action=="Play a Song on Spotify"){
        inquirer.prompt({
            name:"songInput",
            message:"What song would you like to hear?"
        }).then(function(response){
            var song=response.songInput
            song=cleanInput(song);
            //hit spotify api and play song
        })
    }
    else if(response.action=="Get Movie Info"){
        inquirer.prompt({
            name:"movieInput",
            message:"What movie would you like to know more about?"
        }).then(function(response){
            var movie=response.movieInput
            movie=cleanInput(movie);
            //hit spotify api and play song
        })
    }
}) //end get action
}