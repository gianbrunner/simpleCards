/**
 * Global Parameters
 */
let colID;


/**
 * Method to create new Cards
 *
 * @param context
 */
function card(context) {
    //Collection request
    var collectionUrl = '/api/collections';
    var cardUrl = '/api/cards';
    $.ajax({
        url: collectionUrl,
        method: "GET",
        contentType: "application/json"
    }).done(function (json) {
    //Create Layout
        colID = getCollectionID();
        context.render('/assets/html/cards.html', {})
            .appendTo(context.$element())
            //Create Title with Collection name
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
            //Create Fields for Question and Answer
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
                    '</form>';
                $("#questionAnswer").append(questionAnswer);
                $('#cardSubmit').popover('hide');
            })
            //Validate input
            .then(function () {
                document.getElementById('cardSubmit').addEventListener('click', cardAdd);
                document.getElementById('cardQuestion').addEventListener('change', validateQuestion);
                document.getElementById('cardAnswer').addEventListener('change', validateAnswer);
            });
    });
}

/**
 * Adds Card to Database
 */
function cardAdd() {
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
        var url = '/api/cards';
        $.ajax({
            url: url,
            data: card,
            method: "POST",
            contentType: "application/json"
        }).done(function (json) {
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
        $('#cardSubmit').attr('data-content', 'Kartenangaben nicht vollständig');
        $('#cardSubmit').popover('show');
        setTimeout(function () {
            $('#cardSubmit').popover('hide');
        }, 1000);
    }
}

/**
 * Checks if Inputfield length for Question is greater than zero
 */
function validateQuestion() {
    if ($('#cardQuestion').val().length < 1) $('#cardQuestion').addClass('is-invalid');
    else $('#cardQuestion').removeClass('is-invalid');
}

/**
 * Checks if Inputfield length for Answer is greater than zero
 */
function validateAnswer() {
    if ($('#cardAnswer').val().length < 1) $('#cardAnswer').addClass('is-invalid');
    else $('#cardAnswer').removeClass('is-invalid');
}

/**
 * Gets ID from URL
 * @returns {string}
 */
function getCollectionID() {
    let url = window.location.hash;
    return url.substring(10);
}
