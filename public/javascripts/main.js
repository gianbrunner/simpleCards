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
            .then(function(){
                document.getElementById('colSubmit').addEventListener('click', colAdd);
            });
    });
}

function colAdd() {
    let colName = $('#colName').val();
    let colTopic = $('#colTopic').val();
    let colDescr = $('#colDescr').val();
    let col = {
        name: colName,
        topic: colTopic,
        descr: colDescr
    };
    console.log(col);
    let ref = $('#colSubmit');
    let popup = $('#popper');
    /*popup.show();
    var popper = new Popper(ref, popup, {
        placement: 'right'
    });*/
    var url = '/api/collections/';
    $.ajax({
        url: url,
        data: col,
        type: "POST",
        dataType : "json"
    }).done(function(json) {

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
