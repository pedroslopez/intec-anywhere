var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/procesos', require('./router/procesos'));

app.listen(PORT, function() {
  console.log("Server running. Listening on port %s.", PORT)
});