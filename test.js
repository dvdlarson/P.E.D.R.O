var request=require("request");
var inquirer=require("inquirer");
var moment=require("moment");
var now=moment().format("dddd MMMM DD YYYY h:MM a");
function getAction(){


    inquirer.prompt({
        type: "list",
      message: "\n\nToday's date and time: "+now+".\nWhat would you like to do?\n",
      choices: ["See my last 20 Tweets", "Tweet something","Find a song on Spotify", "Get Movie Info","Do a random thing","Quit"],
      name: "action"
    }).then(function(response){
        if(response.action=="Get Movie Info"){
            inquirer.prompt({
                name:"movieInput",
                message:"What movie would you like to know more about?"
            }).then(function(response){
                var movie=response.movieInput
                // movie=cleanInput(movie);
               // getIMDB(movie);           
               var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

               request(omdbURL, function (error, response, body){
                 if(!error && response.statusCode == 200){
                   var body = JSON.parse(body);
                    console.log(body);
                    console.log(error);
                    console.log(response);
            }})
            })
        }

    })
}

getAction();