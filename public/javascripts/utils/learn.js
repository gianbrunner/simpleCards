function learn(context) {
//Collection abfragen
    var collectionUrl = '/api/collections';
    var cardUrl = '/api/cards';
    $.ajax({
        url: collectionUrl,
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
//Layout erzeugen
        console.log(json);
        context.render('/assets/html/learn.html', {})
            .appendTo(context.$element())
            .then(function(){
                var layout =    '<div class="container" id="chooseCollection">'+
                                '<h2>Kartei auswählen</h2>'+
                                '</div>';
                $(".learn").append(layout);
            })
            //Liste erzeugen
            .then(function(){
                json = $.makeArray(json);
                var list =  '<form><div class="form-group">'+
                            '<select class="form-control" id="collectionList">'+
                            '<option selected>Bitte Kartei auswählen</option>'+
                            '</select></div></form>';
                $("#chooseCollection").append(list);
                $.each(json, function(index, value){
                    var option = '<option value="'+ value.id +'">'+ value.name +'</option>';
                    $("#collectionList").append(option);
                });
            })
//Startbutton
            .then(function(){
                var startbutton = '<button type="button" class="btn btn-primary">Starten</button>';
                $("")
    })
}