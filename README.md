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
  <li>Logging all returned data made for a huge and somewhat unreadable log file.</li>
</ul>

In the evolution of the project, I found a much better and more 'natural-language' type user experience was achieved by translating the various function arguments into a list of natural language commands with the Inquirer NPM package. This resolved the need for the user to remember specific complicated commands, or to be reminded, and allowed for the application experience to persist from task to task. Further, it allowed for multi-part user input to be processed without the need for additional functions to parse the multiple words into a string. Log file export limited to action summary information & details on posted tweets for a more usable log.

Please review this incarnation of the personal assistant.

Introducing...

<h1>P.E.D.R.O.</h1>

  P.E.D.R.O. is your Personal E-Digital Resource Organizer. Simply run pedro.js from the command line with the command 'node pedro.js'.
If you give P.E.D.R.O. an extra argv command line argument (like 'help'), you will be presented with a brief help doc.
  P.E.D.R.O. can perform all required functions plus these additional functions:
<ul>
  <li>Post a Tweet</li>
  <li>View the Log file</li>
  <li>Quit the application</li>
</ul>
  P.E.D.R.O. includes this tech:
<ul>
  <li>NPM packages = Moment, Inquirer, Node-spotify-api, Twitter, Request, FS</li>
  <li>ENV variable file for keys</li>
  <li>IMDB API</li>
  <li>Node.js</li>
</ul>
