const express = require('express');

var app = express();

app.set('port', process.env.PORT || 5000)
  .use(express.static(__dirname + '/public'))
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')
  .listen(app.get('port'), function() {
   console.log('Listening on port: ' + app.get('port'));
  });

  app.get("/", function(req, res) {
   console.log("Received a request for /");

   res.write("This is the root.");
   res.end();
});


app.get("/getRate", function(req, res) {
   // Controller
   console.log("Received a request for getRate");
   var method = req.query.shippingMethod;
   var weight = req.query.weight;

   var method = checkWeight(method, weight);

   var price = getPrice(method, weight);


   var params = {price: price, method: method, weight: weight};

   res.render("getRate", params);
});


/*******************************************************************
* CHECK to see if weight is above 3.5 oz
* if it is then we cant use a letter
* will automatically set to flats if above 3.5
*******************************************************************/
function checkWeight(method, weight) {

    if (weight > 3.5 && (method != "Large Envelopes (Flats)" && method != "First-Class Package Service—Retail")) {
      method = "Large Envelopes (Flats)";
   }
   return method;
}

/*******************************************************************
* Get Price takes a shipping method and a Weight
* assuming the weight is within the standards of 13oz and the
* appropriate method is chosen.
*******************************************************************/
function getPrice(method, weight) {

   oz = weight;
   // oz is shorter and what we are using


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

   // returns price at 2 decimals of precision
   return price.toFixed(2);
}

