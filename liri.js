require("dotenv").config();
var moment=require("moment");
var inquirer=require("inquirer");
var keys=require("./keys.js");
var fs=require("fs");
var Spotify=require("node-spotify-api");
var Twitter=require("twitter");
var request=require("request");
var responseArray=[];
var tweetArray=[];
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var now=moment().format("dddd MMMM DD YYYY h:MM a");


function getAction(){
    inquirer.prompt({
        type: "list",
      message: "\n\nToday's date and time: "+now+".\nWhat would you like to do?\n",
      choices: ["See my last 20 Tweets", "Tweet something","Find a song on Spotify", "Get Movie Info","Do a random thing","Quit"],
      name: "action"
    }).then(function(response){
    if(response.action=="See my last 20 Tweets"){
       
        getTwitter();
        
        }//end if 
    else if(response.action=="Tweet something"){
        inquirer.prompt({
            name:"tweetBody",
            message:"What would you like to tell the twitterverse?"
        }).then(function(response){
            var tweetBody=response.tweetBody;
            postTweet(tweetBody);
            
        })
    }
    else if(response.action=="Find a song on Spotify"){
        inquirer.prompt({
            name:"songInput",
            message:"What song would you like to know about?"
        }).then(function(response){
            
            var songName=response.songInput
            console.log("xxxxxxxxxxxxxx"+songName);
            // song=cleanInput(song);
            //hit spotify api and play song
            getSpotify(songName);
           // getAction();
        })
    }
    else if(response.action=="Get Movie Info"){
        inquirer.prompt({
            name:"movieInput",
            message:"What movie would you like to know more about?"
        }).then(function(response){
            // var movie=response.movieInput
            // movie=cleanInput(movie);
            //hit spotify api and play song
            console.log("I'll be able to get info on "+response.movieInput+" soon.\n\n");
            getAction();
        })
    }
    else if(response.action=="Do a random thing"){
        console.log("I'm gonna do a random thing soon.\n\n");
        getAction();
    }
    else if(response.action=="Quit"){
        console.log("Thank you for using your personal assistant.");
        return;
    };
}) //end get action
}


function getTwitter(){
    client.get('statuses/user_timeline', {q: 'user_name=somejerkdave&count=20'}, function(error, tweets, response) {
        
        for(var i=0;i<20;i++){
            var tweetText=tweets[i].text;
            var time=tweets[i].created_at;
           var tweetTime=time.substring(0,19);
            var logText="\n---------------\n\nDate/Time: "+ tweetTime+"\n"+tweetText;
         console.log("\n---------------\n\nDate/Time: "+ tweetTime+"\n"+tweetText);
         

        }//end for loop
        var timestamp=moment().format("YYYY-MM-DD HH:MM");
        fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Get Twitter History\nResult:SUCCESS\n-----------------------");
        });//end twitter promise function
        getAction();
}

function postTweet(text){
    client.post('statuses/update', {status: text}, function(error, tweet, response) {
        if (!error) {
         console.log("\n\nYour tweet has been posted.");
        }
       else { console.log(error);}
       var timestamp=moment().format("YYYY-MM-DD HH:MM");
       fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Post Tweet\nText: "+text+"\n-----------------------");
      });
      getAction();
}

function getSpotify(songName){
    spotify.search({ type: 'track', query: songName }).then( function(data) {
        
            for(var i = 0; i < data.tracks.items.length; i++){
              var songData = data.tracks.items[i];
             // console.log(songData);
              //artist
              console.log("Artist: " + songData.artists[0].name);
              //song name
              console.log("Song: " + songData.name);
              //spotify preview link
              console.log("Preview URL: " + songData.preview_url);
              //album name
              console.log("Album: " + songData.album.name);
              console.log("-----------------------");
              
              
            }
            //adds to log
            var timestamp=moment().format("YYYY-MM-DD HH:MM");
            fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Spotify search\nQuery: "+songName+"\nResults returned: "+data.tracks.items.length+"\n-----------------------");
            
         
          
       
        
      
      });
}

getAction();