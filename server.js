var express = require('express');
var app = express();

var theData = [];

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser); // for parsing application/x-www-form-urlencoded

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});

app.get('/', function (req, res) {
  var txtresp = "<html><head><link rel=\"stylesheet\" href=\"styles.css\" type=\"text/css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"960_12_col.css\" /></head><body>";

//  var txtresp += "<script> var title = \"" + title + "\";</script>"

  for (var i = 0; i < theData.length; i++)
  {
    txtresp += "<h1><a href=\"/getpost?postid="+i+"\">" + theData[i].title + "</a></h1>";
    //txtresp = txtresp + theData[i];
  }

  txtresp += "</body></html>"
  res.send(txtresp);
});

app.get('/getpost', function(req, res) {
  res.send(theData[req.query.postid].post);
});

// app.get('/shawn', function(req, res) {
//   res.send("This is my server!  Enjoy!");
// });

app.post('/formpost', function(req, res) {

  //console.log(req);
  console.log("The User Submitted: " + req.body.title + " " + req.body.post);

  var thePost = {title: req.body.title, post: req.body.post};

  theData.push(thePost);

  //res.send("Thanks for your contribution " + req.body.title);
  res.redirect("/");

});

// app.get('/formpost', function(req, res) {
//   var txtresp = "";
//   for (var i = 0; i < theData.length; i++)
//   {
//     txtresp += theData[i];
//     //txtresp = txtresp + theData[i];
//   }
//   res.send(txtresp);
// });


// app.get('/test', function(req, res) {
//     var textvalue = req.query.textfield;

//     res.send("You submitted: " + textvalue);
// });


// app.get('/shawn', function (req, res) {
//   var arrayOfFiles = ["poem.txt", "test.mp3", "camera.html", "hamster.jpg"];
//   var ranFileNum = Math.floor(Math.random()*arrayOfFiles.length);
// 	//res.sendfile(arrayOfFiles[ranFileNum], {root: './public'}); // Files inside "public" folder
//   //res.sendFile(server.js);
//   res.redirect(arrayOfFiles[ranFileNum]); ///
//   console.log("Doing redirect to: " + arrayOfFiles[ranFileNum]);
// });

app.use(express.static('public'));


console.log("I made this cool file on the server");
