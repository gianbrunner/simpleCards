function card(context) {
//Collection abfragen
    var collectionUrl = '/api/collections/dummy';
    var cardUrl = '/api/cards/dummy';
    $.ajax({
        url: collectionUrl,
        method: "GET",
        contentType: "application/json"
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