var express = require('express'); 
var bodyParser = require('body-parser'); 
 
var app = express(); 
  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
  
app.post("/postdata", (req, res) => { 
    var foo = req.body.foo; 
    var kaa = req.body.kaa; 
    console.log(foo); 
    console.log(kaa); 
    res.send("process complete"); 
}); 
 
app.get("/getdata", (req, res) => { 
    var data = { // this is the data you're sending back during the GET request 
        data1: "mee", 
        data2: "po" 
    } 
    res.status(200).json(data) 
}); 

app.get("/", (req, res) => { 
    res.send("hello world");
}); 
  
app.listen(3000); 