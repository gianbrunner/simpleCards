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
                var startButton = '<button type="button" class="btn btn-primary" id="startButton">Starten</button>';
                $("#chooseCollection").append(startButton);
            })
            .then(function () {
                document.getElementById('startButton').addEventListener('click', showQuestions)
            });
        });
}

function showQuestions(){
    var colID = $("#collectionList").val();
    $.ajax({
        url:'/api/cards',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        console.log(json);
        $("#chooseCollection").hide();
        //Container erzeugen
        var container = '<div class="container" id="questionAnswer">'+
                        '<h2>Fragen beantworten</h2>' +
                        '</div>';
        $(".learn").append(container);
        //Fragen und Anworten erzeugen
        $.each(json, function(index, value){
            if(value.fk_id == colID){
                //Frage erzeugen
                var question = '<p id="question">'+ value.question +'</p>'
                $("#questionAnswer").append(question);
                //Antwortfeld erzeugen
                var answerBox = '<input class="form-control" id="answer" type="text" placeholder="Bitte Antwort eingeben">'+
                '</input><hr>';
                $("#questionAnswer").append(answerBox);
            }
        });
        var checkButton = '<button type="button" class="btn btn-primary" id="checkButton">Überprüfen</button>';
        $("#questionAnswer").append(checkButton);
    }).then(function () {
            document.getElementById('checkButton').addEventListener('click', checkAnswers)
    });
}

function checkAnswers(){
    //Antworten vergleichen
    //Statistik anzeigen

    $("#questionAnswer").hide();
}

