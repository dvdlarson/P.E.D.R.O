

var url="https://icanhazdadjoke.com/"

var joke=fetch(url).then(function(data){
    console.log(data);
}).catch(function(){
    return;
});

