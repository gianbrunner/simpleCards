function collection(context) {
    let colJson;
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        .then(function () {
            colJson = getCollections();
        })
        .then(function () {
            let layout =
                '<div class="container" id="chooseCollection">' +
                '<h2>Vorhandene Karteien</h2>' +
                '</div>' +
                '<div class="container" id="addCollection">' +
                '<h2 class="title">Kartei anlegen</h2>' +
                '<form id="validation" autocomplete="off"> novalidate' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colName" placeholder="Name" onchange="validateName()">' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colTopic" placeholder="Thema" onchange="validateTopic()">' +
                '</div>' +
                '<div class="form-group">' +
                '<textarea class="form-control" id="colDescr" placeholder="Beschreibung" rows="4" onchange="validateDescr()"></textarea>' +
                '</div>' +
                '<button id="colSubmit" type="submit" class="btn btn-info"' +
                'data-toggle="popover" data-placement="right" data-content="Kartei wurde angelegt"' +
                '>Anlegen</button>' +
                '</form>' +
                '</div>';
            let list = '<form><div class="form-group">' +
                '<select class="form-control" id="collectionList">' +
                '<option selected>Bitte Kartei auswählen</option>' +
                '</select></div></form>';
            $("#chooseCollection").append(list);
            $.each(colJson, function (index, value) {
                let option = '<option value="' + value.id + '">' + value.name + '</option>';
                $("#collectionList").append(option);
            });
            $(".collections").append(layout);
            $('#colSubmit').popover('hide');
        })
        .then(function () {
            document.getElementById('colSubmit').addEventListener('click', colAdd);
        });
}

function colAdd() {
    let colName = $('#colName').val();
    let colTopic = $('#colTopic').val();
    let colDescr = $('#colDescr').val();
    let col = {
        name: colName,
        topic: colTopic,
        description: colDescr
    };

    colNameExists(col.name);

    // send form data when okay
    if ($('#validation')[0].checkValidity()) {
        var url = '/api/collections';
        $.ajax({
            url: url,
            data: JSON.stringify(col),
            method: "POST",
            contentType: "application/json"
        }).done(function (json) {
            console.log("done");
            $('#colSubmit').popover('show');
            setTimeout(function () {
                $('#colSubmit').popover('hide');
                app.setLocation("#/collection");
            }, 1000);
        });
    }
}

function validateName() {
    let colName = $('#colName').val();
    if (colName.length == 0) {
        $('#colName').append('<div class="invalid-feedback">Name muss gesetzt werden</div>');
    }
    // ajax request nicht nach jedem Change ausführen

}

function validateTopic() {

}

function validateDescr() {

}


function colNameExists(colName) {
    $.ajax({
        url: '/api/collections',
        method: 'GET'
    }).done(function (json) {
        json.forEach((element) => {
            if (colName === element.name) {
                console.log('exist');
                $('#colName').className = 'form-control is-invalid';
            }
            else {
                console.log('not exist');
                $('#colName').className = 'form-control';
            }
        })
    });
}

function getCollections() {
    $.ajax({
        url: '/api/collections',
        method: 'GET'
    }).done(function (json) {
        return json;
    });
}

/*
    TODO: HTML5 validierungen rausschmeissen und nur javascript
    TODO: eventlistener
    TODO: validierung mit änderungen anpassen
    TODO: Custom nachricht nicht gut
 */