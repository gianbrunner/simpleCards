let colID;

function card(context) {
//Collection abfragen
    var collectionUrl = '/api/collections';
    var cardUrl = '/api/cards';
    $.ajax({
        url: collectionUrl,
        method: "GET",
        contentType: "application/json"
    }).done(function (json) {
//Layout erzeugen
        console.log(json);
        colID = getCollectionID();
        context.render('/assets/html/cards.html', {})
            .appendTo(context.$element())
            .then(function () {
                // var layout = '<div class="container" id="chooseCollection">' +
                //     '<h2>Kartei auswählen</h2>' +
                //     '</div>' +
                //     '<div class="container" id="questionAnswer">' +
                //     '<h2>Frage und Antwort formulieren</h2>' +
                //     '</div>';
                // var layout = '<div class="container" id="collection">' +
                //     '<h3>Kartei auswählen</h3>' +
                //     '</div>';
                // $(".cards").append(layout);
            })
            //Liste erzeugen
            .then(function () {
                json = $.makeArray(json);
                $.each(json, function (index, value) {
                    if(colID == value.id) {
                        var layout = '<div class="container" id="collection">' +
                            '<h2>' + value.name + '</h2>' +
                            '</div>' +
                            '<div class="container" id="questionAnswer">' +
                            '<h2>Frage und Antwort formulieren</h2>' +
                            '</div>';
                        $(".cards").append(layout);
                    }
                });
            })

            //Frage und Antwort erzeugen
            .then(function () {
                var questionAnswer = '<form novalidate autocomplete="off">' +
                    '<div class="form-group">' +
                    '<input type="text" class="form-control" id="cardQuestion" placeholder="Frage">' +
                    '<div class="invalid-feedback">Bitte gib eine gültige Frage an</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<input type="text" class="form-control" id="cardAnswer" placeholder="Antwort">' +
                    '<div class="invalid-feedback">Bitte gib eine gültige Antwort an</div>' +
                    '</div>' +
                    '<button id="cardSubmit" type="button" class="btn btn-info"' +
                    'data-toggle="popover" data-placement="right" data-content="">Anlegen</button>' +
                    // '<p id="colMessage">Bitte wählen Sie eine Kartei aus.</p>'+
                    // '<p id="questionMessage">Bitte geben Sie eine Frage ein.</p>'+
                    // '<p id="answerMessage">Bitte geben Sie eine Antwort ein.</p>'+
                    '</form>';
                $("#questionAnswer").append(questionAnswer);
                $('#cardSubmit').popover('hide');
                // $("#colMessage").hide;
                // $("#questionMessage").hide;
                // $("#answerMessage").hide;
            })
            .then(function () {
                document.getElementById('cardSubmit').addEventListener('click', cardAdd);
                //document.getElementById('collectionList').addEventListener('change', validateCollection);
                document.getElementById('cardQuestion').addEventListener('change', validateQuestion);
                document.getElementById('cardAnswer').addEventListener('change', validateAnswer);
            });
    });
}

function cardAdd() {
    //validateCollection();
    validateQuestion();
    validateAnswer();
    var name = colID;
    var question = $('#cardQuestion').val();
    var answer = $('#cardAnswer').val();
    var card = {
        fk_id: name,
        question: question,
        answer: answer
    };
    if ($('.is-invalid').length == 0) {
        card = JSON.stringify(card);
        console.log(card);
        var url = '/api/cards';
        $.ajax({
            url: url,
            data: card,
            method: "POST",
            contentType: "application/json"
        }).done(function (json) {
            console.log("done");
            $('#cardSubmit').attr('data-content', 'Karte wurde angelegt');
            $('#cardSubmit').popover('show');
            setTimeout(function () {
                $('#cardSubmit').popover('hide');
                //$.sammy.refresh();
                //location.reload();
                $('#cardQuestion').val('').attr('placeholder', 'Frage');
                $('#cardAnswer').val('').attr('placeholder', 'Antwort');
            }, 1000);
        });
    }
    else {
        console.log("inputs not right");
        $('#cardSubmit').attr('data-content', 'Kartenangaben nicht vollständig');
        $('#cardSubmit').popover('show');
        setTimeout(function () {
            $('#cardSubmit').popover('hide');
        }, 1000);
    }
}

function validateQuestion() {
    if ($('#cardQuestion').val().length < 1) $('#cardQuestion').addClass('is-invalid');
    else $('#cardQuestion').removeClass('is-invalid');
}

function validateAnswer() {
    if ($('#cardAnswer').val().length < 1) $('#cardAnswer').addClass('is-invalid');
    else $('#cardAnswer').removeClass('is-invalid');
}

function validateCollection() {
    if ($('#collectionList').val() == 'Bitte Kartei auswählen') $('#collectionList').addClass('is-invalid');
    else $('#collectionList').removeClass('is-invalid');
}

function getCollectionID() {
    let url = window.location.hash;
    return url.substring(10);
}

// function checkFields() {
//     //Kartei kontrollieren
//     if ($('#collectionList').val() == 'Bitte Kartei auswählen') {
//         $("#colMessage").show();
//         $("#colMessage").css("color", "red");
//     } else {
//         $("#colMessage").hide();
//     }
//     //Frage kontrollieren
//     if ($('#cardQuestion').val() == null) {
//         $("#questionMessage").show();
//         $("#questionMessage").css("color", "red");
//     } else {
//         $("#questionMessage").hide();
//     }
//     //Antwort kontrollieren
//     if ($('#cardAnswer').val() == null) {
//         $("#answerMessage").show();
//         $("#answerMessage").css("color", "red");
//     } else {
//         $("#answerMessage").hide();
//     }
// }
/*
    TODO: location.reload nach karte hinzufügen, lädt homepage neu
    TODO: jquery.js codezeile 5013 ist zuständig für sammy.js absturz
*/