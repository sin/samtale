// socket.js

define(['socket.io'], function (io) {
    return io.connect("37.139.30.28:8080");
});