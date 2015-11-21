var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(6666);

function handler (req, res) {
  res.writeHead(200);
  res.end('hi');
}

io.on('connection', socket => {
  socket.emit('welcome', 'you are connected to topanga >:)')
  socket.on('username', username => socket.username = username)

  socket.on('message', message => socket.broadcast.emit('message', {message, user: socket.username}))
});
console.log('topanga running...')
