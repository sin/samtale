jQuery(function ($) {
    'use strict';
    //noinspection JSUnusedLocalSymbols
    var socket = io.connect("37.139.30.28:8080"),

        Message = Backbone.Model.extend({
            defaults: {
                name: "Anonymous",
                message: ""
            },
            socket: socket
        }),

        MessageList = Backbone.Collection.extend({
            model: Message,
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
        }),

        channel = new MessageList(),

        MessageView = Backbone.View.extend({
            tagName: "li",

            template: "<strong>{{name}}:</strong> {{message}}",

            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },

            render: function () {
                var rendered = Mustache.to_html(this.template, this.model.toJSON());
                $(this.el).html(rendered);
                return this;
            }
        }),

        AppView = Backbone.View.extend({
            el: $('#app'),

            events: {
                "submit   #sendForm": "createMsg"
            },

            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'render', 'addOne');
                channel.bind('add', this.addOne);
                channel.fetch();
                var el = $("#messages");
                el.scrollTop(el[0].scrollHeight);
            },

            addOne: function (msg) {
                var view = new MessageView({model: msg}),
                    el = $("#messages");
                this.$('#messages ul').append(view.render().el);
                el.scrollTop(el[0].scrollHeight);
            },

            createMsg: function (e) {
                e.preventDefault();

                var value = this.$('#textInput').val();
                if (!value) {
                    return;
                }

                channel.create({message: value});
                this.$('#textInput').val('');
            }
        }),

        App = new AppView();
    //localStorage.clear();
});