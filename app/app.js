var express = require('express'),
    socket = require('socket.io'),
    redis = require('redis'),
    logger = require('morgan'),
    mustache = require('mustache-express'),
    db = redis.createClient(),
    app = express(),
    serv = app.listen(8080),
    io = socket.listen(serv);

app.engine('mustache', mustache());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/../static'));

app.get('/', function (req, res) {
    res.render('index', { title: "Samtale" });

});

app.use(function(req, res){
    res.send(404);
});

io.sockets.on('connection', function (socket) {

    socket.on('samtale:create', function (data, callback) {
        socket.broadcast.emit('samtale:create', data);
        console.log('create');
    });

    socket.on('samtale:read', function (data, callback) {
        socket.broadcast.emit('samtale:read', {message: 'test'});
        console.log('read');
    });

    socket.on('samtale:update', function (data, callback) {
        socket.emit('samtale:update', {message: 'test'});
        console.log('samtale');
    });

    socket.on('samtale:delete', function (data, callback) {
        socket.emit('samtale:delete', {message: 'test'});
        console.log('delete');
    });

});