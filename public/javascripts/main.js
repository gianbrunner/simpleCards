/**
 * Defines new Sammy application, binds it to #app, sets new route and replaces Content from element app with ''
 */
var app = $.sammy('#app', function() {
    this.get('#/card', function(context) {
        context.app.swap('');
        card(context);
    });
    this.get('#/collection', function(context) {
        context.app.swap('');
        collection(context);
    });
    this.get('#/home', function (context) {
        context.app.swap('');
        homepage(context);
    });
    this.get('#/learn', function (context) {
        context.app.swap('');
        learn(context);
    });
    this.get('#/overview', function (context) {
        context.app.swap('');
        overview(context);
    });
});
/**
 * Sets start page to "home"
 */
$(function(){
    app.run("#/home");
});







