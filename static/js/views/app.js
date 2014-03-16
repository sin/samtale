// AppView

define(['jquery', 'underscore', 'backbone', 'collections/messages', 'views/messages'],
    function ($, _, Backbone, MessagesCollection, MessagesView) {
        var messages = new MessagesCollection();

        return Backbone.View.extend({
            el: $('#app'),

            events: {
                "submit   #sendForm": "createMsg"
            },

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

                var value = this.$('#textInput').val();
                if (!value) {
                    return;
                }

                messages.create({message: value});
                this.$('#textInput').val('');
            }
        });
    });