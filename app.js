var express     = require('express'),
 app            = express(),
 bodyParser     = require('body-parser'),
 mongoose       = require('mongoose');

 mongoose.connect("mongodb://localhost/quotes_ng");
app.use(bodyParser.urlencoded({extended:true}));
 app.set("view engine", "ejs");
 app.use(express.static("public"));

 //SCHEMA SETUP
 var quoteSchema = new mongoose.Schema({
        name: String,
        quote: String
 });

 var Quote = mongoose.model("Quote", quoteSchema);
//  Quote.create( 
//     {name: "Mark Zuckerburg", 
//     quote: "Facebook is more than just a social network, it's a lifestyle!"
// }, function(err, quote){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED QUOTE:")
//             console.log(quote);
//         }
//     });

 

 app.get("/", function(req, res){
    res.render('landing');
 });
 
 app.get("/quotes", function(req, res){
        //Get all quotes from DB
        Quote.find({}, function(err, allQuotes){
           if (err){
               console.log(err);
           } else {
                 res.render("quotes", {quotes:allQuotes});
           } 
        });

       
 });

 app.post("/quotes", function(req, res){
    // get data from form and add to quotes array
    var name = req.body.name;
    var quote = req.body.quote;
    var newQuote = {name: name, quote:quote};
   //create a new quote and save to DB
    Quote.create(newQuote, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
         //redirect back to quotes page
            res.redirect('/quotes');
        } 
    }); 
 });

 app.get("/quotes/new", function(req, res){
    res.render("new");
 });
 
 app.listen(3000, function(){
    console.log("Serving up your App in port 3000!");
 });
  