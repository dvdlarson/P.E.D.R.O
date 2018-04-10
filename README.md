# liri-node-app
LIRI app - week 8 U of A Bootcamp

This is the week 8 homework for the U of A Web Dev bootcamp.

This project is a command line personal assistant application.

Requirements - take input from command line and perform various functions:
<ul>
  <li>Show last 20 tweets</li>
  <li>Get spotify information about a song</li>
  <li>Get IMDB information about a movie</li>
  <li>Do an action based on information in a text file</li>
  <li>Optional:Log actions & results to log file</li>
</ul>

  User input is to be in the form of specific commands plus a value argument.

Example: node liri.js spotify-this-song songName

I found the user experience in this model to be less than ideal. 

Specifically:
<ul>
  <li>It was difficult to remember the specific commands, which required a long reminder message</li>
  <li>The argv format requires a lot of typing.</li>
  <li>After each task, the user is returned to the command line. It did not feel like being in a personal assistant application.</li>
  <li>Logging all returned data made for a very large and somewhat unreadable log file.</li>
  <li>There is no provision in the original design to view or clear the log file.</li>
</ul>

In the evolution of the project, I found a much better and more 'natural-language' type user experience was achieved by translating the various function arguments into a list of natural language commands with the Inquirer NPM package. 
This resolved several issues:
<ul>
<li>The need for the user to remember specific complicated commands, or to be reminded.</li>
<li>Allowed for the application experience to persist from task to task.</li>
<li>Allowed for multi-part user input to be processed without the need for additional functions to parse multiple words into a string.</li>
<li>UI able to feature more complex, multi-level user interactions and future-proof functionality like input validation should it be needed.</li>
<ul>

The log file export in this version was limited to specific action summary information & logs specific details only for posted tweets.

Please review this incarnation of the personal assistant and enjoy.

Introducing...

<h1>P.E.D.R.O.</h1>

  P.E.D.R.O. is your Personal E-Digital Resource Organizer. Simply run pedro.js from the command line with the command 'node pedro.js'.
  If you give P.E.D.R.O. an extra argv command line argument (like 'help'), you will be presented with a brief help doc. P.E.D.R.O. works best with a larger size terminal window.

  P.E.D.R.O. can perform all required functions plus these additional functions:
<ul>
  <li>Post a Tweet</li>
  <li>Tell me a joke</li>
  <li>View the log file</li>
  <li>Clear the log file</li>
  <li>Quit the application</li>
</ul>
  P.E.D.R.O. includes this tech:
<ul>
  <li>NPM packages = Moment, Inquirer, Node-spotify-api, Twitter, Request, FS,Node-fetch</li>
  <li>ENV variable file for keys</li>
  <li>IMDB API,icanhazdadjoke.com API</li>
  <li>Node.js</li>
</ul>

If you are going to attempt to run P.E.D.R.O. you will need to create your own .env file with your personal twitter & spotify secret keys.
It should be named simply '.env', contain the information below, and saved in the main directory with the other program files:
# Spotify API keys

SPOTIFY_ID=<Your key here>
SPOTIFY_SECRET=<Your key here>

# Twitter API keys

TWITTER_CONSUMER_KEY=<Your key here> 
TWITTER_CONSUMER_SECRET=<Your key here>
TWITTER_ACCESS_TOKEN_KEY=<Your key here>
TWITTER_ACCESS_TOKEN_SECRET=<Your key here>
