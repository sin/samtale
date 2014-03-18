// router.js

define(['jquery', 'underscore', 'backbone', 'views/app'],
    function ($, _, Backbone, AppView) {
        var AppRouter = Backbone.Router.extend(),

            initialize = function () {
                var appRouter = new AppRouter();

                appRouter.route('', '', function () {
                    //noinspection JSUnusedLocalSymbols
                    var App = new AppView();
                });

                Backbone.history.start({pushState: true});
            };

        return {
            initialize: initialize
        };
    });