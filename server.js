var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.resolve(__dirname, 'wwwroot')));

app.listen(5777, function() {
  console.log('Listening...');
});
