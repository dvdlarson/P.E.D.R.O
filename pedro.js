require("dotenv").config();
var moment=require("moment");
const fetch = require('node-fetch');
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

//if someone tries to run the program with an optional argument, show them some help documentation
var command = process.argv[2];

if(command){
    console.log("\nP.E.D.R.O. is your personal electronic/digitial response organizer.\nSimply run the program, and use the up/down arrow keys to choose an action.\nAvailable actions:\n- See your last 20 tweets\n- SEND a tweet (new)\n- Find a song on Spotify\n- Get IMDB movie information\n- Do a randomly specified thing stored in a text file\n- View or clear the user activity log\n- Get a joke to brighten your day");
    return;
}


function getAction(){
    var now = 0;
    now=moment().format("MMMM D, YYYY hh:mm a");
    inquirer.prompt({
        type: "list",
      message: "Current date and time: "+now+".\nWhat would you like to do?",
      choices: ["Tell me a joke","See my last 20 Tweets", "Tweet something","Find a song on Spotify", "Get Movie Info","View/Clear Log","Do a random thing","Quit"],
      name: "action"
    }).then(function(response){
    if(response.action=="See my last 20 Tweets"){
       
        getTwitter();
        
        }//end if 
    else if(response.action=="Tweet something"){
        inquirer.prompt({
            name:"tweetBody",
            message:"You have the mic. What is @somejerkdave going to tell the world?"
        }).then(function(response){
            var tweetBody=response.tweetBody;
            postTweet(tweetBody);
            
        });
    }
    else if(response.action=="Find a song on Spotify"){
        inquirer.prompt({
            name:"songInput",
            message:"What song would you like to know about?"
        }).then(function(response){
            
            var songName=response.songInput
           // console.log("xxxxxxxxxxxxxx"+songName);
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
            var movie=response.movieInput
            if (movie==""){
                movie="Mr. Nobody";
            }
            // movie=cleanInput(movie);
            getIMDB(movie);           
            
        })
    }
    else if(response.action=="Do a random thing"){
        //console.log("I'm gonna do a random thing soon.\n\n");
        doRandom();
       // getAction();
    }
    else if(response.action=="Tell me a joke"){
        getJoke();
      
    }
    else if(response.action=="View/Clear Log"){
        inquirer.prompt({
            type: "list",
          message: "\nWhich would you like to do?",
          choices: ["View Log", "Clear Log"],
          name: "choice"
        }).then(function(response){
            if(response.choice=="Clear Log"){
                inquirer.prompt({
                    type: "list",
                message: "\nAre you sure? This action can not be reversed.",
                choices: ["Yes", "No"],
                name: "verify"
                }).then(function(response){
            var verify=response.verify;
           if(verify=="Yes"){
               clearLog();
           }
            else {
                getAction();
            };
           
        })
    }
    else {viewLog();}
    })
    }
    else if(response.action=="Quit"){
        console.log("Thank you for using P.E.D.R.O.");
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
        var timestamp=moment().format("YYYY-MM-DD hh:mm a");
        fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Get Twitter History\nResult:SUCCESS\n-----------------------", (error) => { return; });
        });//end twitter promise function
        getAction();
}

function postTweet(text){
    client.post('statuses/update', {status: text}, function(error, tweet, response) {
        if (!error) {
         console.log("\n\nYour tweet has been posted.");
        }
       else { return;}
       var timestamp=moment().format("YYYY-MM-DD hh:mm a");
       fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Post tweet\nText: "+text+"\n-----------------------",(error)=>{return;});
      });
      getAction();
}

function getSpotify(songName){
    spotify.search({ type: 'track', query: songName }).then( function(data) {
            console.log("\nSPOTIFY RESULTS\n====================================\n")
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
            var timestamp=moment().format("YYYY-MM-DD hh:mm a");
            fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Spotify search\nQuery: "+songName+"\nResults returned: "+data.tracks.items.length+"\n-----------------------",(error)=>{console.log(error);});
        getAction();
      });
}
function getIMDB(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&apikey=trilogy';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);
    //    console.log(body);
      console.log("\n\nTitle: " + body.Title);
      console.log("Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
    }})
    var timestamp=moment().format("YYYY-MM-DD hh:mm a");
            fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: IMDB search\nQuery: "+movie+"\nResult: Success\n-----------------------",(error)=>{console.log(error);});
       
    getAction();
}
function doRandom(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      getSpotify(txt[1]);
      
    });
  }

function viewLog(){
    fs.readFile("log.txt", "utf8", function (error, data) {

        console.log(data);
        var timestamp=moment().format("YYYY-MM-DD hh:mm a");
        fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: View Log\n",(error)=>{return;});
       
        getAction();
    
    });    
}
function clearLog(){
    fs.writeFile("log.txt", "", (err) => {
        
    if(err) throw err;
    else {
        console.log("====================================\nLog file has been cleared\n====================================");
        getAction();
    }
});
}
function getJoke(){
    var url="https://icanhazdadjoke.com/slack"

    fetch(url)
    .then(res => res.json())
    .then(json => console.log("\n==========================\n"+json.attachments[0].text+"\n==========================\n")).then(getAction());
        
    fetch(url)
	.catch(err => console.error(err));     
    // var timestamp=moment().format("YYYY-MM-DD hh:mm a");
    // fs.appendFile('log.txt', "\nTimestamp: "+timestamp+"\nActivity: Get Joke\nJoke:"+json.attachments[0].text,(error)=>{return;});
}
//program action code
getAction();