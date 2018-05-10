export function card(context) {
    let url = '/api/cards/dummy';
    $.ajax({
        url: url,
        type: "GET",
        dataType : "json"
    }).done(function(json) {
        console.log(json);
        context.render('/assets/html/cards.html', {})
            .appendTo(context.$element())
            .then(function () {
                json = $.makeArray(json);
                $.each(json, function(index, value) {
                    var card = '<div class="card col-sm"><div class="card-body">' +
                        '<h5 class="card-title">'+ value.question +'</h5>' +
                        '<h5 class="card-title">'+ value.answer +'</h5>' +
                        '</div></div>';
                    $(".cards").append(card);
                });
            });
    });
}