// socket.js

define(['socket.io'], function (io) {
    return io.connect("192.168.1.2:8080");
});