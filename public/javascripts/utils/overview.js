// --- globale Variablen
var colArray = [];
// --- Methoden
function overview(context) {
    //Collection abfragen
    $.ajax({
        url: '/api/collections',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        //Layout erzeugen
        console.log(json);
        context.render('/assets/html/overview.html', {})
            .appendTo(context.$element())
            .then(function () {
                var layout = '<div class="container" id="collections">' +
                    '<h2>Übersicht der Karteien</h2>' +
                    '<div class="row" id="colOverview">'+
                    '</div></div>';
                $(".overview").append(layout);
            })
            //Cards für Collections erzeugen
            .then(function () {
                $.each(json, function (index, value) {
                    var card =  '<div class="col-sm-12 col-md-6 col-4"><div class="card"><div class="card-body">'+
                                '<h4 class="card-title">'+ value.name +'</h4>'+
                                '<p class="card-text">Kategorie: '+ value.topic +
                                '<br>Beschreibung: '+ value.description +'</p>'+
                                '<button type="button" class="btn btn-primary" id="cardButton'+ value.id +'" value="'+value.id+'">Karten anzeigen</button>'+
                                '<button type="button" class="btn btn-danger" id="deleteButton'+ value.id +'" value="'+value.id+'">Kartei löschen</button>'+
                                '</div></div></div>';
                    $("#colOverview").append(card);
                    document.getElementById('cardButton'+ value.id +'').addEventListener('click', function(){
                        loadCards(value.id, value.name);
                    });
                    document.getElementById('deleteButton'+ value.id +'').addEventListener('click', function(){
                        deleteCol(value.id);
                    });
                });
            })
    });
}
function loadCards(colID, colName){
    //Cards abfragen
    $.ajax({
        url:'/api/cards',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        console.log(json);
        $("#collections").hide();
        //Container erzeugen
        var layout =    '<div class="container" id="collections">' +
                        '<h2>Übersicht der Karten</h2>' +
                        '<div class="row" id="cardOverview">'+
                        '</div></div>';
        $(".overview").append(layout);
        //Karten erzeugen
        $.each(json, function(index, value){
            if(value.fk_id == colID){
                var card =  '<div class="col-sm-12 col-md-6 col-4"><div class="card"><div class="card-body">'+
                            '<h4 class="card-title">Karte Nr.: '+ value.id +'</h4>'+
                            '<p class="card-text">Frage: '+ value.question +
                            '<br>Antwort: '+ value.answer +'</p>'+
                            '<button type="button" class="btn btn-danger" id="deleteButton'+ value.id +'" value="'+value.id+'">Karte löschen</button>'+
                            '</div></div></div>';
                $("#cardOverview").append(card);
                document.getElementById('deleteButton'+ value.id +'').addEventListener('click', function(){
                    deleteCard(value.id);
                });
            }
        });
    });
}

function deleteCol(colID){
    $.ajax({
        url: '/api/collections/'+colID,
        type: 'DELETE',
        success: function(result) {
            alert("Kartei gelöscht!");
        }
    });
}

function deleteCard(cardID){
    $.ajax({
        url: '/api/cards/'+colID,
        type: 'DELETE',
        success: function(result) {
            alert("Karte gelöscht!");
        }
    });
}