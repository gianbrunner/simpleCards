// --- Globale Variablen
//Fragenarray
var questions = [];
//Antwortenarray
var answers = [];
//Lösungsarray
var correctAnswers = [];


// --- Methoden
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
    //Arrays resetten
    questions = [];
    answers = [];
    correctAnswers = [];
    //Cards abfragen
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
                var answerBox = '<input class="form-control answer" id="answer" type="text" placeholder="Bitte Antwort eingeben">'+
                '</input><hr>';
                $("#questionAnswer").append(answerBox);
                //Lösung in Array schreiben
                questions.push(value.question);
                correctAnswers.push(value.answer);
            }
        });
        console.log(questions);
        console.log(correctAnswers);
        var checkButton = '<button type="button" class="btn btn-primary" id="checkButton">Überprüfen</button>';
        $("#questionAnswer").append(checkButton);
    }).then(function () {
            document.getElementById('checkButton').addEventListener('click', checkAnswers)
    });
}

function checkAnswers(){
    //Antworten abfragen und in Array eintragen
    $(".answer").each(function(){
        answers.push($(this).val());
    });
    console.log(answers);
    //Antworten mit Lösung vergleichen
    correctAnswerCounter = 0;
    answerAmount = answers.length;
    for(i = 0; i<answers.length; i++){
        //answers[i] = answers[i].toLowerCase();
        //correctAnswers[i] = correctAnswers[i].toLowerCase();
        if(answers[i].toLowerCase() == correctAnswers[i].toLowerCase()){
            correctAnswerCounter++;
        }
    }
    console.log(correctAnswerCounter);
    //Statistik anzeigen
    showStatistic(correctAnswerCounter, answerAmount);
}

function showStatistic(correctAnswerCounter, answerAmount) {
    $("#questionAnswer").hide();
    //Übersicht Punktzahl
    var header =    '<div class="container" id="statistic">'+
                    '<h2>Auswertung</h2>' +
                    '<p id="score">Erreichte Punkte: '+ correctAnswerCounter +' von '+ answerAmount +'</p>'+
                    '</div>'
    $(".learn").append(header);
    //Grundgerüst Vergleichstabelle
    var table = '<table class="table table-bordered">'+
                '<thead><tr>'+
                '<th scope="col">Nr.</th>'+
                '<th scope="col">Frage</th>'+
                '<th scope="col">Ihre Antwort</th>'+
                '<th scope="col">Korrekte Antwort</th>'+
                '</tr></thead>'+
                '<tbody id="table"></tbody>'+
                '</table></div>';
    $("#statistic").append(table);
    //Tabelle füllen
    for(i = 0; i<answers.length; i++){
        var temp = i+1;
        var row =   '<tr id="tableRow'+i+'"><th scope=row>'+ temp +'</th>'+
                    '<td>'+ questions[i] +'</td>'+
                    '<td>'+ answers[i] +'</td>'+
                    '<td>'+ correctAnswers[i] +'</td>'+
                    '</tr>';
        $("#table").append(row);
        //Richtig/Falsch einfärben
        if(answers[i].toLowerCase() == correctAnswers[i].toLowerCase()){
            $("#tableRow"+ i).css("background-color","#ccffdd");
        }else{
            $("#tableRow"+ i).css("background-color","#ff6666");
        }
    }
    //theoretischer Notenschnitt berechnen
    var grade = correctAnswerCounter/answerAmount*5+1;
    var gradeText = '<p>Bei einer Prüfung mit linearer Notenskala hätten Sie folgende Note erreicht: '+ grade + '</p>';
    $("#statistic").append(gradeText);
    //Button um "lernen" neuzustarten
    var startAgainButton = '<button type="button" class="btn btn-primary" id="startAgainButton">Nochmals lernen</button>';
    $("#statistic").append(startAgainButton);
    document.getElementById('startAgainButton').addEventListener('click', refresh);
}

function refresh(){
    location.reload();
}