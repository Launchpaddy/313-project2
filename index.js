var express = require("express");

var app = express();

app.set("views",__dirname + "/views");
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
   console.log("Received a request for getRate");
   method = req.query.shippingMethod;
   weight = req.query.weight;

   method = checkWeight(method, weight);

   var price = getPrice(method, weight);


   var params = {price: price, method: method, weight: weight};

   res.render("getRate", params);
});

function checkWeight(method, weight) {

    if (weight > 3.5 && (method != "Large Envelopes (Flats)" && method != "First-Class Package Service—Retail")) {
      method = "Large Envelopes (Flats)";
   }
   return method;
}

function getPrice(method, weight) {
   // access the database
   // make sure they have permission to be on the site
   oz = weight;


   var price = 0.00;
   switch(method){
      case "Letters (Stamped)":
         price = 0.50;
         for (var i = 1; oz > i; i++) {
            price += 0.21;
         }
         break;
      case "Letters (Metered)":
         price = 0.47;
         for (var i = 1; oz > i; i++) {
            price += 0.21;
         }
         break;
      case "Large Envelopes (Flats)":
         price = 1.00;
         for (var i = 1; oz > i; i++) {
            price += 0.21;
         }
         break;
      case "First-Class Package Service—Retail":
         price = 3.75;
         for (var i = 1; oz >= i; i++) {
            if (oz < 5) {
               price = 3.50;
            }
            if (oz > 4 && oz < 9) {
               price = 3.75;
            }
            if (i > 8) {
               price += 0.35;
            }
         }
         break;

   }


   return price.toFixed(2);
}
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
