
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.static('../client'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/signup",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});



app.post("/",function(req,res){

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.mail;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fieldd:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url =" https://us6.api.mailchimp.com/3.0/lists/016163cade";
  const options = {
    method: "POST",
    auth: "ashwin1:388eb1510fd109f153df37d368e53304-us6"
  }



const request =  https.request(url , options , function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname + "/final.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running in port 3000");

});


// audience id
// 016163cade.

// api key
// 29ff5b99a55103fe643c99e6eebeba7f-us6
// fc09e4e5b8dc83aa205122c78b7872fb-us6
