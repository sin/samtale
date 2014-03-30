// AppView

define(['jquery', 'underscore', 'backbone', 'collections/messages', 'views/messages'],
    function ($, _, Backbone, MessagesCollection, MessagesView) {
        var messages = new MessagesCollection();

        return Backbone.View.extend({
            el: $('#app'),

            events: {
                "submit   #sendForm": "createMsg"
            },

            input: $('#textInput'),

            initialize: function () {
                _.bindAll(this, 'render', 'addOne');
                messages.bind('add', this.addOne);
                messages.fetch();
                var el = $("#messages");
                el.scrollTop(el[0].scrollHeight);
            },

            addOne: function (msg) {
                var view = new MessagesView({model: msg}),
                    el = $("#messages");
                this.$('#messages ul').append(view.render().el);
                el.scrollTop(el[0].scrollHeight);
            },

            createMsg: function (e) {
                e.preventDefault();
                e.stopPropagation();

                var value = this.input.val(),
                    nick = $('#nickname').val();

                if (!value) {
                    return;
                }

                if (nick === "") {
                    nick = undefined;
                }

                messages.create({message: value, name: nick});
                this.input.val('');
            }
        });
    });