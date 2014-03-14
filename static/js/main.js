jQuery(function ($) {
    'use strict';

    //noinspection JSUnusedLocalSymbols
    var Message = Backbone.Model.extend({
            defaults: {
                name: "Anonymous",
                message: ""
            }
        }),

        MessageList = Backbone.Collection.extend({
            model: Message,
            localStorage: new Store("samtale")
        }),

        channel = new MessageList(),

        MessageView = Backbone.View.extend({
            tagName: "li",

            template: "{{name}}: {{message}}",

            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },

            render: function () {
                console.log("test");
                var rendered = Mustache.to_html(this.template, this.model.toJSON());
                $(this.el).html(rendered);
                return this;
            }
        }),

        AppView = Backbone.View.extend({
            el: $('#app'),

            events: {
                "submit   #sendForm": "create"
            },

            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'render', 'addOne');
                channel.bind('add', this.addOne);
                channel.fetch();
            },

            addOne: function (msg) {
                var view = new MessageView({model: msg});
                this.$('#messages ul').append(view.render().el);
            },

            create: function (e) {
                var value = this.$('#textInput').val();
                if (!value) {
                    return;
                }

                channel.create({message: value});
                this.$('#textInput').val('');
            }
        }),

        App = new AppView();
});