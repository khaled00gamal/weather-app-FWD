const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

const projectData = {};

app.get("/getData",function(req,res){
  res.send(projectData);
  });
  

app.post("/sendData",function(req,res){
console.log(req.body);//for testing
projectData['date']=req.body.date;
projectData['temp']=req.body.temp;
projectData['content']=req.body.content;
res.send(projectData);
});



app.listen(3000,function(){
    console.log("server is running on port 3000");
  });