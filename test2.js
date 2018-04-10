const fetch = require('node-fetch');


var url="https://icanhazdadjoke.com/slack"

fetch(url)
    .then(res => res.json())
    .then(json => console.log("\n==========================\n"+json.attachments[0].text+"\n==========================\n"));

        
    fetch(url)
	.catch(err => console.error(err));     
        
        
        
        
        
    //     res => res.json())
    // .then(json => console.log(json.attachments[0].text));

