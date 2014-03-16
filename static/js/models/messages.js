// MessagesModel

define(['jquery', 'underscore', 'backbone', 'socket', 'iosync', 'iobind'],
    function ($, _, Backbone, socket) {
        return Backbone.Model.extend({
            defaults: {
                name: "Anonymous",
                message: ""
            },
            socket: socket
        });
    });