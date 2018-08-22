var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/procesos', require('./router/procesos'));

app.listen(PORT, function() {
  console.log("Server running. Listening on port %s.", PORT)
});