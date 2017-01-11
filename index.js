// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;

var mypath = __dirname + '/public'
console.log(mypath)
app.use(express.static(mypath));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


// Socket IO
var numUsers = 0;

io.on('connection', function(socket){
  console.log('a user connected');
  numUsers = numUsers + 1;
  socket.on('disconnect', function(){
    console.log('user disconnected');
    numUsers = numUsers - 1;
  });

  socket.on('register', function(ticker){
    tickers[ticker] = 0;
  });
});


// ------------------- TWITTER CLIENT --------------------------
var Twitter = require('twitter');
var mydata = {
    consumer_key: 'NjlPYLCfZeQioN6jHR4oO4QEI',
    consumer_secret: 'MnHfidtnyp68lmQCMWIP0fVFx0TeZ1qg2XXBFgOoEvP3UGcJqk',
    access_token_key: '208686751-korbDzWNZ4XtNdGtTNAAU5smpDA3WvvGIQS8NJJC',
    access_token_secret: 'uN3a5fj7m2gDFpI5i0DVQSx0SLiJZwfSOt8KKDEv5QSXW'
};

var client = new Twitter(mydata);

var tickers = {
  'pen': 0,
  'wallet':0
};


var count = 0;

function updateCount(){
  io.emit('count', count);
  count = 0;
}

setInterval(updateCount, 1000)

var stream = client.stream('statuses/filter', {track: 'capital'});
stream.on('data', function(event) {
  console.log(event && event.text);
  count = count +1;
});

stream.on('error', function(error) {
  console.log(error)
});
