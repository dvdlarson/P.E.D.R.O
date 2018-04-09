var fs=require("fs");

fs.readFile("log.txt", "utf8", function (error, data) {

    console.log(data);

});

