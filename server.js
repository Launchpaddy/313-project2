var express = require("express");

var app = express();

app.set("views", "views"); //__dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {
   console.log("Received a request for /");

   res.write("This is the root.");
   res.end();
});

app.listen(5000, function() {
    console.log("Listening on port 5000");
});

app.get("/getRate", function(req, res) {
   // Controller
   console.log("Received a request for the get Rate");
   var name = getCurrentLoggedInUserAccount();
   var emailAddress = "john@email.com";

   var params = {username: name, email: emailAddress};

   res.render("getRate", params);
});
// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 5000;
// var app = express();
// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  // .get('/', (req, res) => res.render('pages/index'))
