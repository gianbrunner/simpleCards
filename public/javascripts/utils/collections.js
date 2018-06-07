/**
 * Global Parameters
 */
let namesAllCol = [];

/**
 * Method to create new Collections
 * @param context
 */
function collection(context) {
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        //Creates Layout
        .then(function () {
            let layout =
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
                '<button id="colSubmit" type="button" class="btn btn-info"' +
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
                });
            });
            $(".collections").append(layout);
            $('#colSubmit').popover('hide');
        })
        // Validates Input
        .then(function () {
            document.getElementById('colSubmit').addEventListener('click', colAdd);
            document.getElementById('colName').addEventListener('change', validateName);
            document.getElementById('colTopic').addEventListener('change', validateTopic);
            document.getElementById('colDescr').addEventListener('change', validateDescr);
        });
}

/**
 * Adds Collection to Database
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
            $('#colSubmit').attr('data-content', 'Kartei wurde angelegt');
            $('#colSubmit').popover('show');
            setTimeout(function () {
                $('#colSubmit').popover('hide');
                window.location = '/#/overview';
            }, 1000);
        });
    }
    else {
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
