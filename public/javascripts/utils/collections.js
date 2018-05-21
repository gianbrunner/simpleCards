function collection(context) {
    context.render('/assets/html/collections.html', {})
        .appendTo(context.$element())
        .then(function () {
            let layout =
                '<h2 class="title">Kartei anlegen</h2>' +
                '<form>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colName" placeholder="Name">' +
                '</div>' +
                '<div class="form-group">' +
                '<input type="text" class="form-control" id="colTopic" placeholder="Thema">' +
                '</div>' +
                '<div class="form-group">' +
                '<textarea class="form-control" id="colDescr" placeholder="Beschreibung" rows="4"></textarea>' +
                '</div>' +
                '<div id="popup">Kartei wurde angelegt</div>' +
                '<button id="colSubmit" type="submit" class="btn btn-info">Anlegen</button>' +
                '</form>';
            $(".collections").append(layout);
            $('#popup').hide();
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
    // let ref = $('#colSubmit');
    // let popup = $('#popper');
    // popup.show();
    // var popper = new Popper(ref, popup, {
    //     placement: 'right'
    // });
    col = JSON.stringify(col);
    console.log(col);
    var url = '/api/collections';
    $.ajax({
        url: url,
        data: col,
        method: "POST",
        contentType: "application/json"
    }).done(function (json) {
        console.log("done");
    });
}