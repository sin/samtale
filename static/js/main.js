// main.js

require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        "socket.io": 'libs/socket.io/socket.io',
        mustache: 'libs/mustache/mustache',
        localStorage: 'libs/backbone.localStorage/backbone.localStorage',
        iobind: 'libs/backbone.iobind/backbone.iobind',
        iosync: 'libs/backbone.iobind/backbone.iosync',
        json: 'libs/json2/json2',
        text: 'libs/require/text'
    },
    shim: {
        'json': {
            exports: 'JSON'
        }
    }
});

require(['app'], function (App) {
    App.initialize();
});
