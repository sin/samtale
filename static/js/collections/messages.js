// MessagesCollection

define(['jquery', 'underscore', 'backbone', 'socket', 'iosync', 'iobind', 'models/messages'],
    function ($, _, Backbone, socket, iobind, iosync, MessagesModel) {
        return Backbone.Collection.extend({
            model: MessagesModel,
            url: 'samtale',
            socket: socket,
            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'serverCreate');
                this.ioBind('create', this.serverCreate, this);
            },
            serverCreate: function (data) {
                this.add(data);
            }
        });
    });