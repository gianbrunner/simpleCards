// --- globale Variablen
var colArray = [];
var url = 'localhost:9000';
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
                    '<div class="media">'+
                    '<div class="media-body">'+
                    '<h2>Übersicht der Karteien</h2>' +
                    '</div>'+
                    '<img src="/assets/images/addButton.svg" id="addColButton" alt="addButton" width="50" height="50">'+
                    '</div>'+
                    '<div class="row" id="colOverview">'+
                    '</div></div>';
                $(".overview").append(layout);
                document.getElementById('addColButton').addEventListener('click', function(){
                    addCol();
                });
            })
            //Cards für Collections erzeugen
            .then(function () {
                $.each(json, function (index, value) {
                    var card =  '<div class="col-sm-12 col-lg-6"><div class="card"><div class="card-body">'+
                                '<h4 class="card-title">'+ value.name +'</h4>'+
                                '<p class="card-text">Kategorie: '+ value.topic +
                                '<br>Beschreibung: '+ value.description +'</p>'+
                                '<div class="btn-group" role="group" aria-label="Basic example">'+
                                '<button type="button" class="btn btn-primary" id="cardButton'+ value.id +'" value="'+value.id+'">Karten anzeigen</button>'+
                                '<button type="button" class="btn btn-secondary" id="cardAddButton'+ value.id +'" value="'+value.id+'">Karte hinzufügen</button>'+
                                '<button type="button" class="btn btn-danger" id="deleteButton'+ value.id +'" value="'+value.id+'">Kartei löschen</button>'+
                                '</div></div></div></div>';
                    $("#colOverview").append(card);
                    document.getElementById('cardButton'+ value.id +'').addEventListener('click', function(){
                        loadCards(value.id, value.name);
                    });
                    document.getElementById('cardAddButton'+ value.id +'').addEventListener('click', function(){
                        addCard();
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
    alert("Kartei gelöscht!");
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
        url: '/api/cards/'+cardID,
        type: 'DELETE',
        success: function(result) {
            alert("Karte gelöscht!");
        }
    });
}

function addCol(){
    var colUrl = 'http://'+ url + '/#/collection';
    $(location).attr('href', colUrl);
}

function addCard(){
    var cardUrl = 'http://'+ url + '/#/card';
    $(location).attr('href', cardUrl);
}
