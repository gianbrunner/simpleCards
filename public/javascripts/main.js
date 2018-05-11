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
//Collection abfragen
    var collectionUrl = '/api/collections/dummy';
    var cardUrl = '/api/cards/dummy';
    $.ajax({
        url: collectionUrl,
        type: "GET",
        dataType : "json"
    }).done(function(json) {
//Layout erzeugen
        console.log(json);
        context.render('/assets/html/cards.html', {})
            .appendTo(context.$element())
            .then(function(){
                var layout =    '<div class="container" id="chooseCollection">'+
                                '<h2>Kartei auswählen</h2>'+
                                '</div>'+
                                '<div class="container" id="questionAnswer">'+
                                '<h2>Frage und Antwort formulieren</h2>'+
                                '</div>';
                $(".cards").append(layout);
            })
//Cards für jede Collection erzeugen
            .then(function () {
                json = $.makeArray(json);
                $.each(json, function(index, value) {
                    var card =  '<div class="col-sm-6 col-lg-3">'+
                                '<div class="card" id="'+ value.id +'">'+
                                '<div class="card-header">'+ value.name +'</div>' +
                                '<ul class="list-group list-group-flush">' +
                                '<li class="list-group-item">'+ value.topic +'</li>' +
                                '<li class="list-group-item">'+ value.description +'</li>' +
                                '</ul></div></div>';
                    $("#chooseCollection").append(card);
                });
            })
//Frage und Antwort erzeugen
            .then(function () {
                var questionAnswer ='<form>' +
                                    '<div class="form-group">' +
                                    '<input type="text" class="form-control" id="colQuestion" placeholder="Frage">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<input type="text" class="form-control" id="colAnswer" placeholder="Antwort">' +
                                    '</div>' +
                                    '<button id="colSubmit" type="submit" class="btn btn-info">Anlegen</button>' +
                                    '</form>';
                    $("#questionAnswer").append(questionAnswer);
            });
    });
}

function collection(context) {
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        .then(function () {
            let layout =
                '<h2 class="title">Kartei anlegen</h2>' +
                '<form>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colName" placeholder="Name">' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colTopic" placeholder="Thema">' +
                '</div>' +
                '<div class="form-group">' +
                '<textarea class="form-control" id="colDescr" placeholder="Beschreibung" rows="4"></textarea>' +
                '</div>' +
                '<div id="popup">Kartei wurde angelegt</div>' +
                '<button id="colSubmit" type="submit" class="btn btn-info">Anlegen</button>' +
                '</form>';
            $(".collections").append(layout);
            $('#popup').hide();
        })
        .then(function () {
            document.getElementById('colSubmit').addEventListener('click', colAdd);
        });
}

function colAdd() {
    let colName = $('#colName').val();
    let colTopic = $('#colTopic').val();
    let colDescr = $('#colDescr').val();
    let col = {
        name: colName,
        topic: colTopic,
        description: colDescr
    };
    // let ref = $('#colSubmit');
    // let popup = $('#popper');
    // popup.show();
    // var popper = new Popper(ref, popup, {
    //     placement: 'right'
    // });
    col = JSON.stringify(col);
    console.log(col);
    var url = '/api/collections';
    $.ajax({
        url: url,
        data: col,
        method: "POST",
        dataType: "json",
        contentType: "json"
    }).done(function (json) {
        console.log("done");
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
