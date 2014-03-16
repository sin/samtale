// MessagesView

define(['jquery', 'underscore', 'backbone', 'mustache', 'collections/messages', 'text!./../../views/messages.mustache'],
    function ($, _, Backbone, Mustache, messagesCollection, messagesTemplate) {

        return Backbone.View.extend({
            tagName: "li",

            template: messagesTemplate,

            initialize: function () {
                //noinspection JSLint
                _.bindAll(this, 'render');
                console.log(this.template);
                this.model.bind('change', this.render);
            },

            render: function () {
                var rendered = Mustache.to_html(this.template, this.model.toJSON());
                $(this.el).html(rendered);
                return this;
            }
        });
    });