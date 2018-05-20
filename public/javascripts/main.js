var app = $.sammy('#app', function() {          // definiert neue Sammy application und bindet diese an #app
    this.get('#/card', function(context) {     // neue route
        context.app.swap('');                   // ersetzt den Inhalt vom app Element mit ''
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
});

$(function(){
    app.run("#/home");
});






function learn(context) {

}
