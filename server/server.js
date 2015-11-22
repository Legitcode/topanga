var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
  res.writeHead(200);
  res.end('hi');
}

io.on('connection', socket => {
  console.log('hey there connection')
  socket.on('username', username => socket.username = username)
  socket.on('message', text => io.emit('message', {text, username: socket.username})) //socket.broadcast
  socket.emit('message', {text: 'You are now connected >:)', username: 'Topanga'})
});
console.log('topanga running...')
