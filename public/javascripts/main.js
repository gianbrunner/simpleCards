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

function card(context) {
    var collectionUrl = '/api/collections/dummy';
    var cardUrl = '/api/cards/dummy';
    $.ajax({
        url: collectionUrl,
        type: "GET",
        dataType : "json"
    }).done(function(json) {
        console.log(json);
        context.render('/assets/html/cards.html', {})
            .appendTo(context.$element())
            .then(function () {
                json = $.makeArray(json);
                $.each(json, function(index, value) {
                    var card =  '<div class="card col-sm"><div class="card-body">' +
                                '<h5 class="card-title">'+ value.question +'</h5>' +
                                '<h5 class="card-title">'+ value.answer +'</h5>' +
                    '</div></div>';
                    $(".cards").append(card);
                });
            });
    });
}

function collection(context) {
    var url = '/api/collections/dummy';
    $.ajax({
        url: url,
        type: "GET",
        dataType : "json"
    }).done(function(json) {
        console.log(json);
        context.render('/assets/html/collections.html', {})
            .appendTo(context.$element())
            .then(function () {
                json = $.makeArray(json);
                $.each(json, function(index, value) {
                    var card = '<div class="card col-sm"><div class="card-body">' +
                        '<h5 class="card-title">'+ value.name +'</h5>' +
                        '<h5 class="card-title">'+ value.topic +'</h5>' +
                        '<h5 class="card-title">'+ value.description +'</h5>' +
                    '</div></div>';
                    $(".collections").append(card);
                });
            });
    });
}

function homepage(context) {
    context.render('/assets/html/homepage.html', {})
        .appendTo(context.$element())
        .then(function () {
            var jumbotron = '<div class="jumbotron">' +
                '<h1 class="diplay-3">Willkommen bei simpleCards!</h1>' +
                '<p class="lead">Diese Webapplikation hilft dir, Karteikarten zu erstellen, zu ordnen und zu lernen, ganz ohne Papier.</p>' +
                '<hr class="my-4">' +
                '<p class="lead">Du kannst problemlos mehrere Karteien zu deinen Schulfächern erstellen, diese mit Karten füllen und dich dann selbst abfragen. Klingt einfach, ist es auch!</p>' +
                '<a class="btn btn-primary btn-lg" href="#/collection" role="button">Jetzt beginnen</a>' +
                '</div>';
            $(".home").append(jumbotron);
        });
}
function learn(context) {

}
