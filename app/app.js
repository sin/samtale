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
app.set('views', __dirname + '/../views');

app.use(logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/../static'));
app.use(express.static(__dirname + '/../views'));

app.get('/', function (req, res) {
    res.render('index', { title: "Samtale" });

});

app.use(function(req, res){
    res.send(404);
});

io.sockets.on('connection', function (socket) {
    socket.on('message_to_server', function (data) {
        io.sockets.emit("message_to_client", { message: data.message, name: data.name });
    });
});