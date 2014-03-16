// socket.js

define(['socketio'], function (io) {
    return io.connect("192.168.43.254:8080");
});
