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
            //Liste erzeugen
            .then(function(){
                json = $.makeArray(json);
                var list =  '<select class="cusom-select" id="collectionList">'+
                            '<option selected>Bitte Kartei auswählen</option>'+
                            '</select>';
                            $("#chooseCollection").append(list);
                $.each(json, function(index, value){
                    var option = '<option value ="'+ value.id +'">'+ value.topic +'</option>';
                    $("#collectionList").append(option);
                });
            })

            //Frage und Antwort erzeugen
            .then(function () {
                var questionAnswer ='<form>' +
                    '<div class="form-group">' +
                    '<input type="text" class="form-control" id="cardQuestion" placeholder="Frage">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<input type="text" class="form-control" id="cardAnswer" placeholder="Antwort">' +
                    '</div>' +
                    '<button id="cardSubmit" type="submit" class="btn btn-info">Anlegen</button>' +
                    '</form>';
                $("#questionAnswer").append(questionAnswer);
            })
            .then(function (){
                document.getElementById('cardSubmit').addEventListener('click', cardAdd);
            });
    });
}
function cardAdd() {
    let name = $('#colName').val();
    let question = $('#cardQuestion').val();
    let answer = $('#cardAnswer').val();
    let card = {
        fk_id: name,
        question: question,
        answer: answer
    };
    card = JSON.stringify(card);
    console.log(card);
    var url = '/api/cards';
    $.ajax({
        url: url,
        data: card,
        method: "POST",
        dataType: "json",
        contentType: "json"
    }).done(function (json) {
        console.log("done");
    });
}