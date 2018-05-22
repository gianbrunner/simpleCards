function collection(context) {
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        .then(function () {
            let layout =
                '<h2 class="title">Kartei anlegen</h2>' +
                '<form class="needs-validation" autocomplete="off">' +
                '<div class="form-group">' +
                '<input required type="text" class="form-control" id="colName" placeholder="Name">' +
                '</div>' +
                '<div class="form-group">' +
                '<input required type="text" class="form-control" id="colTopic" placeholder="Thema">' +
                '</div>' +
                '<div class="form-group">' +
                '<textarea required class="form-control" id="colDescr" placeholder="Beschreibung" rows="4"></textarea>' +
                '</div>' +
                '<button id="colSubmit" type="submit" class="btn btn-info"' +
                'data-toggle="popover" data-placement="right" data-content="Kartei wurde angelegt"' +
                '>Anlegen</button>' +
                '</form>';
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
    validation(col);
    var url = '/api/collections';
    $.ajax({
        url: url,
        data: JSON.stringify(col),
        method: "POST",
        contentType: "application/json"
    }).done(function (json) {
        console.log("done");
        $('#colSubmit').popover('show');
        setTimeout(function() {
            $('#colSubmit').popover('hide');
            app.setLocation("#/collection");
        }, 1000);
    });
}

function validation(collection) {
    $('form.needs-validation')[0].addEventListener('invalid', function(e) {
        if(colExists(collection.name)){
            e.setCustomValidity('Karteiname existiert bereits');
        }
    })

}

function colExists(name) {
    $.ajax({
        url: '/api/collections',
        method: 'GET'
    }).done(function (json) {
        json.forEach(function(col) {
            if(col.name.equals(name)) return true;
        })
        return false;
    });
}