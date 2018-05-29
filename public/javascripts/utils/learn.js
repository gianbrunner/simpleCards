function learn(context) {
//Collection abfragen
    $.ajax({
        url: '/api/collections',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
//Layout erzeugen
        console.log(json);
        context.render('/assets/html/learn.html', {})
            .appendTo(context.$element())
            .then(function () {
                var layout = '<div class="container" id="chooseCollection">' +
                    '<h2>Kartei auswählen</h2>' +
                    '</div>';
                $(".learn").append(layout);
            })
            //Liste erzeugen
            .then(function () {
                json = $.makeArray(json);
                var list = '<form><div class="form-group">' +
                    '<select class="form-control" id="collectionList">' +
                    '<option selected>Bitte Kartei auswählen</option>' +
                    '</select></div></form>';
                $("#chooseCollection").append(list);
                $.each(json, function (index, value) {
                    var option = '<option value="' + value.id + '">' + value.name + '</option>';
                    $("#collectionList").append(option);
                });
            })
            //Startbutton
            .then(function () {
                var startbutton = '<button type="button" class="btn btn-primary" id="startbutton">Starten</button>';
                $("#chooseCollection").append(startbutton);
            })
            .then(function (){
                var colID = $("#collectionList").val();
                document.getElementById('startbutton').addEventListener('click', function(){
//Fragen anzeigen
                    $.ajax({
                        url:'/api/cards/:'+ colID ,
                        method: "GET",
                        contentType: "application/json"
                    }).done(function(json) {
                        console.log(json);
                        $("#chooseCollection").hide();
                        var questionAnswer = '<div class="container" id="questionAnswer">' +
                            '<p id="question">' + +'</p>'
                        '</div>';
                    })
                });
            })
    });
}

