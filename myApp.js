// more @ https://www.freecodecamp.org/learn/back-end-development-and-apis/#basic-node-and-express

var express = require('express');
var app = express();

console.log("Hello World")

/* Serve Static Assets */
//To serve static assets from the public folder you can use the express.static() method as the middleware.
// A middleware needs to be mounted using the method app.use(path, middlewareFunction).
// Next line is to mount the express.static() middleware to the path /public with app.use()
app.use("/public", express.static(__dirname + "/public"));

/* Implement a Root-Level Request Logger Middleware */
// Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle.
function logger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  // Remember to call next() when you are done, or your server will be stuck forever.
  next();
}

app.use(logger)

/* Chain Middleware to Create a Time Server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.send({"time": req.time});
});

/* Get Route Parameter Input from the Client */
app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
  // res.send({echo: req.params.word});
});

/* Get Query Parameter Input from the Client */
// Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query.
app.get('/name', function(req, res) {
  res.json({name: req.query.first + " " + req.query.last})
});

/* Use body-parser to Parse POST Requests */
// Besides GET, there is another common HTTP verb, it is POST. 

/* --- */
function handler (req, res) {
  // Use the Node global variable __dirname to calculate the path
  absolute_path = __dirname + '/views/index.html'  
  res.sendFile(absolute_path);
}

app.get("/", handler)

/* Serve JSON on a Specific Route */
// While an HTML server serves HTML, an API serves data. A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). 
// These days, the preferred data format for moving information around the web is JSON.
// Serve the object {"message": "Hello json"} as a response, in JSON format, to GET requests to the /json route.
app.get("/json", (req, res) => {
  var text = "Hello json"
  if (process.env.MESSAGE_STYLE === "uppercase")
  {
    text = text.toUpperCase()
  }
  res.json({"message": text})
})


  
































 module.exports = app;
