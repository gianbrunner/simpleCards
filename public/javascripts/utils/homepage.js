function homepage(context) {
    context.render('/assets/html/homepage.html', {})
        .appendTo(context.$element())
        .then(function () {
            var jumbotron = '<div class="jumbotron">' +
                '<h1 class="diplay-3">Willkommen bei simpleCards!</h1>' +
                '<p class="lead">Diese Webapplikation hilft dir, Karteikarten zu erstellen, zu ordnen und zu lernen, ganz ohne Papier.</p>' +
                '<hr class="my-4">' +
                '<p class="lead">Du kannst problemlos mehrere Karteien zu deinen Schulfächern erstellen, diese mit Karten füllen und dich dann selbst abfragen. Klingt einfach, ist es auch!</p>' +
                '<a class="btn btn-primary btn-lg" href="#/overview" role="button">Jetzt beginnen</a>' +
                '</div>';
            $(".home").append(jumbotron);
        });
}