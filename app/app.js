var express = require('express'),
    redis = require('redis'),
    logger = require('morgan'),
    mustache = require('mustache-express'),
    db = redis.createClient(),
    app = express();

app.engine('mustache', mustache());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/../views');


app.use(logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/../static'));

app.get('/', function (req, res) {
    res.render('index', { message: "Hello there!" });

});

var server = app.listen(8080, function () {
    console.log('Listening on port %d', server.address().port);
});