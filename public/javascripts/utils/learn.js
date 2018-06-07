/**
 * Global Parameters
 */
var questions = [];
var answers = [];
var correctAnswers = [];
var collectionID;

/**
 * Method to learn all Cards by chosen Collection
 * @param context
 */
function learn(context) {
    // get Collection
    $.ajax({
        url: '/api/collections',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
    // Create Layout
        collectionID = getColID();
        context.render('/assets/html/learn.html', {})
            .appendTo(context.$element())
            .then(function () {
                var layout = '<div class="container" id="chooseCollection">' +
                    '<h2>Kartei auswählen</h2>' +
                    '</div>';
                $(".learn").append(layout);
            })
            .then(
                showQuestions
            );
        });
}

/**
 * Shows all Questions from chosen Collection
 */
function showQuestions(){
    // reset Arrays
    questions = [];
    answers = [];
    correctAnswers = [];
    // get all Cards
    $.ajax({
        url:'/api/cards',
        method: "GET",
        contentType: "application/json"
    }).done(function(json) {
        $("#chooseCollection").hide();
        var container = '<div class="container" id="questionAnswer">'+
                        '<h2>Beantworte die folgenden Fragen</h2>' +
                        '</div>';
        $(".learn").append(container);
        //Creates Questions and Inputfield for Answers
        $.each(json, function(index, value){
            if(value.fk_id == collectionID){
                var question = '<p id="question">'+ value.question +'</p>'
                $("#questionAnswer").append(question);
                var answerBox = '<input class="form-control answer" id="answer" type="text" placeholder="Bitte Antwort eingeben">'+
                '</input><hr>';
                $("#questionAnswer").append(answerBox);
                // Writes given Answers into Array
                questions.push(value.question);
                correctAnswers.push(value.answer);
            }
        });
        var checkButton = '<button type="button" class="btn btn-primary" id="checkButton">Überprüfen</button>';
        $("#questionAnswer").append(checkButton);
    }).then(function () {
            document.getElementById('checkButton').addEventListener('click', checkAnswers)
    });
}

/**
 *
 */
function checkAnswers(){
    // Writes given Answers into Array
    $(".answer").each(function(){
        answers.push($(this).val());
    });
    // Compares given Answers with correct Answers
    correctAnswerCounter = 0;
    answerAmount = answers.length;
    for(i = 0; i<answers.length; i++){
        if(answers[i].toLowerCase() == correctAnswers[i].toLowerCase()){
            correctAnswerCounter++;
        }
    }
    showStatistic(correctAnswerCounter, answerAmount);
}

/**
 * Method for showing the compared Answers in form of a table
 * Adds additional Information like Grade and score
 * @param correctAnswerCounter
 * @param answerAmount
 */
function showStatistic(correctAnswerCounter, answerAmount) {
    $("#questionAnswer").hide();
    // Overview score
    var header =    '<div class="container" id="statistic">'+
                    '<h2>Auswertung</h2>' +
                    '<p id="score">Erreichte Punkte: '+ correctAnswerCounter +' von '+ answerAmount +'</p>'+
                    '</div>'
    $(".learn").append(header);
    // Basic table
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
    // Adds rows to table
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
    // calculates Grade
    var grade = correctAnswerCounter/answerAmount*5+1;
    var gradeText = '<p>Bei einer Prüfung mit linearer Notenskala hätten Sie folgende Note erreicht: '+ grade + '</p>';
    $("#statistic").append(gradeText);
    var startAgainButton = '<button type="button" class="btn btn-primary" id="startAgainButton">Nochmals lernen</button>';
    $("#statistic").append(startAgainButton);
    document.getElementById('startAgainButton').addEventListener('click', refresh);
    var overviewButton = '<button type="button" class="btn btn-primary" id="overviewButton">Zurück zur Übersicht</button>';
    $("#statistic").append(overviewButton);
    document.getElementById('overviewButton').addEventListener('click', backToOverview);
}

function refresh(){
    location.reload();
}

function getColID() {
    let url = window.location.hash;
    return url.substring(11);
}

function backToOverview() {
    window.location = '/#/overview';
}