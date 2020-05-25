const factorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
$(function () {
    $('#players').on('change', function (event) {
        $('#characteristic').html('');
        $('#shapley .cell-players').remove();
        combinations(Array.apply(undefined, Array(parseInt($('#players :selected').val()))).map(function (x, y) { return String.fromCharCode(y + 65); }).join('')).sort(function (a, b) { return a.length - b.length || a.localeCompare(b) }).forEach(element => $('#characteristic').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`));
    });
    $('#random').on('click', function (event) {
        $('#characteristic .cell-container').toArray().forEach((elem, idx) => $(elem).find('input').val(randomIntFromInterval(($(elem).find('.cell-top').html().length - 1) * 10, $(elem).find('.cell-top').html().length * 10)));
    });
    $('#load').on('click', function (event) {
    });
    $('#calculate').on('click', function (event) {
        
    });
    $('#players').trigger('change');
});

function combinations(str) {
    var fn = function (rest, a) {
        for (var i = 0; i < rest.length; i++)
            a.push(rest[i]);
        return a;
    }
    return fn(str, []);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}