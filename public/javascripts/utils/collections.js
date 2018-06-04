let namesAllCol = [];
let idAllCol = [];

function collection(context) {
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        .then(function () {
            let layout =
                // --- existings collections
                // '<div class="container" id="chooseCollection">' +
                // '<h2>Vorhandene Karteien</h2>' +
                // '<form><div class="form-group">' +
                // '<select class="form-control" id="collectionList">' +
                // '<option selected>Bitte Kartei auswählen</option>' +
                // '</select></div>' +
                // '<div class="form-group">' +
                // '<button id="colDelete" type="button" class="btn btn-info"' +
                // 'data-toggle="popover" data-placement="right" data-content=""' +
                // '>Entfernen</button></div>' +
                // '</form>' +
                // '</div>' +
                // --- add collection
                '<div class="container" id="addCollection">' +
                '<h2 class="title">Kartei anlegen</h2>' +
                '<form novalidate id="validation" autocomplete="off"> ' +
                '<div class="form-group" id="formName">' +
                '<input type="text" class="form-control" id="colName" placeholder="Name">' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colTopic" placeholder="Thema">' +
                '<div class="invalid-feedback">Name des Themas ist zu kurz</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<textarea class="form-control" id="colDescr" placeholder="Beschreibung" rows="4"></textarea>' +
                '<div class="invalid-feedback">Beschreibung ist zu kurz</div>' +
                '</div>' +
                '<button id="colSubmit" type="submit" class="btn btn-info"' +
                'data-toggle="popover" data-placement="right" data-content=""' +
                '>Anlegen</button>' +
                '</form>' +
                '</div>';
            $.ajax({
                url: '/api/collections',
                method: 'GET'
            }).done(function (json) {
                $.each(json, function (index, value) {
                    namesAllCol.push(value.name);
                    // let option = '<option value="' + value.id + '">' + value.name + '</option>';
                    // $("#collectionList").append(option);
                });
            });
            $(".collections").append(layout);
            //$('#colDelete').popover('hide');
            $('#colSubmit').popover('hide');
        })
        .then(function () {
            //document.getElementById('colDelete').addEventListener('click', colDelete);
            document.getElementById('colSubmit').addEventListener('click', colAdd);
            document.getElementById('colName').addEventListener('change', validateName);
            document.getElementById('colTopic').addEventListener('change', validateTopic);
            document.getElementById('colDescr').addEventListener('change', validateDescr);
        });
}

// /**
//  * Get collection from select-field. If collection exists, delete it and refresh site.
//  * If collection doesn't exists or no collection is chosen, show popover and do nothing.
//  */
// function colDelete() {
//     let col = $('#collectionList').val();
//     console.log(col);
//     console.log(idAllCol.map(id => id + '').includes(col));
//     console.log(idAllCol);
//     if(!(col == 'Bitte Kartei auswählen') && idAllCol.map(id => id + '').includes(col)) {
//         $.ajax({
//             url: '/api/collections/' + col,
//             method: 'DELETE'
//         }).done(function () {
//             console.log("done");
//             $('#colDelete').attr('data-content', 'Kartei wurde entfernt');
//             $('#colDelete').popover('show');
//             setTimeout(function () {
//                 $('#colDelete').popover('hide');
//                 $.sammy.refresh();
//                 //location.reload();
//             }, 1000);
//         });
//     }
//     else {
//         console.log("no collection chosen");
//         $('#colDelete').attr('data-content', 'Bitte zuerst eine Kartei auswählen');
//         $('#colDelete').popover('show');
//         setTimeout(function () {
//             $('#colDelete').popover('hide');
//         }, 1000);
//     }
// }

/**
 * Send form-data if validation passed.
 */
function colAdd() {
    validateName();
    validateTopic();
    validateDescr();
    let colName = $('#colName').val();
    let colTopic = $('#colTopic').val();
    let colDescr = $('#colDescr').val();
    let col = {
        name: colName,
        topic: colTopic,
        description: colDescr
    };
    // send form data when okay
    if ($('.is-invalid').length == 0) {
        var url = '/api/collections';
        $.ajax({
            url: url,
            data: JSON.stringify(col),
            method: "POST",
            contentType: "application/json"
        }).done(function () {
            console.log("done");
            $('#colSubmit').attr('data-content', 'Kartei wurde angelegt');
            $('#colSubmit').popover('show');
            setTimeout(function () {
                $('#colSubmit').popover('hide');
                //$.sammy.refresh();
                //location.reload();
                window.location = '/#/overview';
            }, 1000);
        });
    }
    else {
        console.log("inputs not right");
        $('#colSubmit').attr('data-content', 'Karteiangaben nicht vollständig');
        $('#colSubmit').popover('show');
        setTimeout(function () {
            $('#colSubmit').popover('hide');
        }, 1000);
    }
}

/**
 * Only set name input to valid, if name longer than 2 chars and name doesn't already exists.
 */
function validateName() {
    let nameExistsDiv = '<div id="exists" class="invalid-feedback">Name existiert bereits</div>';
    let nameShortDiv = '<div id="short" class="invalid-feedback">Name ist zu kurz</div>';
    let colName = $('#colName').val().toLowerCase();
    $('#exists').remove();
    $('#short').remove();
    $('#colName').removeClass('is-invalid');
    if (colName.length < 3) {
        $('#formName').append(nameShortDiv);
        $('#colName').addClass('is-invalid');
    }
    if(namesAllCol.map(name => name.toLowerCase()).includes(colName)) {
        $('#formName').append(nameExistsDiv);
        $('#colName').addClass('is-invalid');
    }
}

/**
 * Only set topic input to valid, if topic longer than 2 chars.
 */
function validateTopic() {
    if($('#colTopic').val().length < 3) $('#colTopic').addClass('is-invalid');
    else $('#colTopic').removeClass('is-invalid');
}

/**
 * Only set description textarea to valid, if description longer than 2 chars.
 */
function validateDescr() {
    if($('#colDescr').val().length < 3) $('#colDescr').addClass('is-invalid');
    else $('#colDescr').removeClass('is-invalid');
}
/*
    TODO: location.reload nach kartei hinzufügen, lädt homepage neu
    TODO: nach kartei delete gibt es unschönen reload
    TODO: jquery.js codezeile 5013 ist zuständig für sammy.js absturz
*/