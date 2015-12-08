var Rx = require('rx'),
    $ = require('jquery');

var main = function () {
    var searchInput = document.querySelector('[data-role="searchbox"]'),
        resultsList = document.querySelector('[data-role="results-list"]');

    var keyupStream = Rx.Observable.fromEvent(searchInput, 'keyup')
        .map(function (e) {
            return e.target.value;
        })
        .filter(function (term) {
            return term.length > 2;
        })
        .debounce(500)
        .distinctUntilChanged();

    var requestStream = keyupStream.flatMapLatest(requestSearch);

    requestStream.subscribe(
        function (data) {
            renderResults(resultsList, data);
        },

        function (error) {
            renderError(resultsList);
        });
};

var renderResults = function (node, data) {
    var terms = data[1],
        descriptions = data[2],
        links = data[3],
        results = [];

    results = terms.map(function (term, idx) {
        return '<li class="result">' +
            '<a href="' + links[idx] + '" class="result-term">' + term + '</a>' +
            '<p class="result-description">' + descriptions[idx] + '</p>' +
        '</li>';
    });

    node.innerHTML = results.join('');
};

var renderError = function (node) {
    node.innerHTML = '<p>Sorry, try later</p>';
};

var requestSearch = function (search) {
    return $.ajax({
        url: 'http://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            format: 'json',
            action: 'opensearch',
            search: search
        }
    }).promise();
};

$(main);
