// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

//create an empty object
const responseObject = {};

const isInvalidDate = (date) => {
  //params = parseInt(params);
  console.log(date.toUTCString() === "Invalid Date");
  console.log("in", date, typeof date);
  return date.toUTCString() === "Invalid Date";
};

app.get("/api/:input", (req, res) => {
  let date = new Date(req.params.input);

  //if the input pass the text ie true
  // the we need to convert it into number using +
  //this convert string to number
  if (isInvalidDate(date)) {
    date = new Date(+req.params.input);
  }

  //handles error if it is still invalid for params entered
  // hanldles invalid input such as string chars
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  responseObject["unix"] = date.getTime();
  responseObject["utc"] = date.toUTCString();
  res.json(responseObject);

  // res.json({
  //   unix: date.getTime(),
  //   utc: date.toUTCString(),
  // });

  // if (params.includes("-" || " " || "/")) {
  //   let date = new Date(params);
  //   let millisecsonds = date.getTime();

  //   responseObject["unix"] = millisecsonds;
  //   responseObject["utc"] = date.toUTCString();
  // } else {
  //   // let date = new Date(1970, 0, 1);
  //   // let ms = date.setTime(params);
  //   params = parseInt(params);
  //   let da = new Date(params);
  //   let ms = da.getTime();
  //   let utc = da.toUTCString();

  //   responseObject["unix"] = new Date(params).getTime();
  //   responseObject["utc"] = new Date(params).toUTCString();
  // }

  // if (!responseObject["unix"] || !responseObject["utc"]) {
  //   res.json({ error: "Invalid Date" });
  // } else {
  //   res.json(responseObject);
  // }
});

//create api route for empty params

app.get("/api/", (req, res) => {
  let currDate = new Date();
  let milliSeconds = currDate.getTime();
  responseObject["unix"] = milliSeconds;

  responseObject["utc"] = currDate.toUTCString();

  res.json(responseObject);
});

var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + 3000);
});
