const factorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
$(function () {
    $('#sellers').on('change', function (event) {
        $('#seller').html('');
        combinations(Array.apply(undefined, Array(parseInt($('#sellers :selected').val()))).map(function (x, y) { return String.fromCharCode(y + 65); }).join('')).sort(function (a, b) { return a.length - b.length || a.localeCompare(b) }).forEach(element => $('#seller').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`));
        $('#seller').width(90 * parseInt($('#sellers :selected').val()));
    });
    $('#buyers').on('change', function (event) {
        $('#buyer').html('');
        Buyer(parseInt($('#sellers :selected').val()), parseInt($('#buyers :selected').val()));
    });
    $('#random').on('click', function (event) {
        $('#characteristic .cell-container').toArray().forEach((elem, idx) => $(elem).find('input').val(randomIntFromInterval(($(elem).find('.cell-top').html().length - 1) * 10, $(elem).find('.cell-top').html().length * 10)));
    });
    $('#load').on('click', function (event) {
    });
    $('#calculate').on('click', function (event) {
        
    });
    $('#sellers').trigger('change');
    $('#buyers').trigger('change');
});

function combinations(str) {
    var fn = function (rest, a) {
        for (var i = 0; i < rest.length; i++)
            a.push(rest[i]);
        return a;
    }
    return fn(str, []);
}
function Buyer(a, b) {
    x = [];
    //    $('#seller').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`);
    $('#buyer').append('<div class="buyercell-container"></div>');
    $('.buyercell-container').append('<div class="cell-top"></div>');
    for (var j = 0; j < a; j++) {
        element = String.fromCharCode(j + 65);
        $('.buyercell-container').append('<div class="cell-top">'+element+'</div>');
    }
    for (var i = 0; i < b; i++) {
        $('#buyer').append('<div class="buyercell-container"></div>');
        element = String.fromCharCode(i + 'I');
        $('.buyercell-container').last().append('<div class="cell-top">' + element + '</div>');
        for (var j = 0; j < a; j++) {

        }
    }
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}