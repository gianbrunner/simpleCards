/**
 * Method for showing an Overview about Collections and Cards
 * @param context
 */
function overview(context) {
    $.ajax({
        url: '/api/collections',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        //Create Layout
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
            //Create Bootstrap-Cards for Collections
            .then(function () {
                $.each(json, function (index, value) {
                    var card =  '<div class="col-sm-12 col-lg-6"><div class="card"  id="colNr'+ value.id +'"><div class="card-body">'+
                                '<h4 class="card-title">'+ value.name +'</h4>'+
                                '<p class="card-text">Kategorie: '+ value.topic +
                                '<br>Beschreibung: '+ value.description +'</p>'+
                                '<button type="button" class="btn btn-primary" id="cardButton'+ value.id +'" value="'+value.id+'">Karten anzeigen</button>'+
                                '<button type="button" class="btn btn-primary" id="learnButton'+ value.id +'" value="'+value.id+'">Kartei lernen</button>'+
                                '<button type="button" class="btn btn-secondary" id="cardAddButton'+ value.id +'" value="'+value.id+'">Karte hinzufügen</button>'+
                                '<button type="button" class="btn btn-danger" id="deleteButton'+ value.id +'" value="'+value.id+'">Kartei löschen</button>'+
                                '</div></div></div>';
                    $("#colOverview").append(card);
                    document.getElementById('cardButton'+ value.id +'').addEventListener('click', function(){
                        loadCards(value.id, value.name);
                    });
                    document.getElementById('cardAddButton'+ value.id +'').addEventListener('click', function(){
                        addCard(value.id);
                    });
                    document.getElementById('deleteButton'+ value.id +'').addEventListener('click', function(){
                        deleteCol(value.id);
                    });
                    document.getElementById('learnButton'+ value.id +'').addEventListener('click', function(){
                        learnCol(value.id);
                    });
                });
            })
    });
}

/**
 * Method for Card overview
 * @param colID
 * @param colName
 */
function loadCards(colID, colName){
    $.ajax({
        url:'/api/cards',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        $("#collections").hide();
        // Creates Layout
        var layout =    '<div class="container" id="collections">' +
                        '<h2>Übersicht der Karten</h2>' +
                        '<div class="row" id="cardOverview">'+
                        '</div></div>';
        $(".overview").append(layout);
        // Creates Bootstrap-Cards for each Card
        $.each(json, function(index, value){
            if(value.fk_id == colID){
                var card =  '<div class="col-sm-12 col-md-6 col-4"><div class="card" id="cardNr'+ value.id +'"><div class="card-body">'+
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

/**
 * Deletes Collection on Click
 * @param colID
 */
function deleteCol(colID){
    $.ajax({
        url: '/api/collections/'+colID,
        type: 'DELETE',
        success: function(result) {
            $("#colNr"+colID).hide();
        }
    });
}

/**
 * Deletes Card on Click
 * @param cardID
 */
function deleteCard(cardID){
    $.ajax({
        url: '/api/cards/'+cardID,
        type: 'DELETE',
        success: function(result) {
            $("#cardNr"+cardID).hide();
        }
    });
}

function addCol(){
    window.location = '/#/collection';
}

function addCard(colID){
    window.location = '/#/card' + '?id=' + colID;
}

function learnCol(colID){
    window.location = '/#/learn' + '?id=' + colID;
}
