var path = require('path');
var express = require('express');
var Web3 = require('web3');
var contract = require('truffle-contract');
var app = express();

app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/ballertoken', function(req, res) {
	res.json(ballerToken_artifacts);
});

app.use(express.static(path.join(__dirname)));
app.use('/app/css', express.static(__dirname + '/css'));
app.use('/app/img', express.static(__dirname + '/img'));
app.use('/app/js', express.static(__dirname + '/js'));
app.use('/app/font', express.static(__dirname + '/font'));
app.use('/build/contracts', express.static(__dirname + '/build/contracts'));
app.set('port', process.env.PORT || 8081);
app.set('view engine', 'html');

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});