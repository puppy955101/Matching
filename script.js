$(function () {
    $('#sellers').on('change', function (event) {
        $('#seller').html('');
        $('#matching').html('');
        combinations(Array.apply(undefined, Array(parseInt($('#sellers :selected').val()))).map(function (x, y) { return String.fromCharCode(y + 65); }).join('')).sort(function (a, b) { return a.length - b.length || a.localeCompare(b) }).forEach(element => $('#seller').append(`<div class="sellercell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`));
        $('#seller').width(90 * parseInt($('#sellers :selected').val()));
        $('#buyer').html('');
        Buyer(parseInt($('#sellers :selected').val()), parseInt($('#buyers :selected').val()));
    });
    $('#buyers').on('change', function (event) {
        $('#buyer').html('');
        $('#matching').html('');
        Buyer(parseInt($('#sellers :selected').val()), parseInt($('#buyers :selected').val()));
    });
    $('#random').on('click', function (event) {
        $('.sellercell-container').toArray().forEach((elem, idx) => $(elem).find('input').val(randomIntFromInterval(($(elem).find('.cell-top').html().length - 1) * 10, $(elem).find('.cell-top').html().length * 10)));
        x = $('.buyercell-container').toArray();
        for (var i = 0; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                //alert('1');
                $(y[j]).val(randomIntFromInterval(1, 10));
            }
        }
        //$('.buyercell-container').toArray().forEach((elem, idx) => $(elem).toArray().forEach((elem, idx) => $(elem).find('input').val(randomIntFromInterval(($(elem).find('.cell-top').html().length - 1) * 10, $(elem).find('.cell-top').html().length * 10))));
    });
    $('#testcase').on('click', function (event) {
        $('#sellers').val(3);
        $('#buyers').val(3);
        $('#sellers').trigger('change');
        $('#buyers').trigger('change');
        data = [[23,26,20],[22,24,21],[21,22,17]]
        x = $('.buyercell-container').toArray();
        for (var i = 1; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                $(y[j]).val(data[i-1][j]);
            }
        }
        data = [18, 15, 19];
        x = $('.sellercell-container').toArray();
        for (var i = 0; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                $(y[j]).val(data[i]);
            }
        }
    });
    $('#calculate').on('click', function (event) {
        $('#matching').html('');
        rec();
        buyer = [];
        x = $('.buyercell-container').toArray();
        for (var i = 1; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                buyer.push(parseInt($(y[j]).val()));
            }
        }
        seller = [];
        x = $('.sellercell-container').toArray();
        for (var i = 0; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                seller.push(parseInt($(y[j]).val()));
            }
        }
        ans = DFS(buyer, seller,0);
    });
    $('#sellers').trigger('change');
    $('#buyers').trigger('change');
});

function DFS(buyer, seller, pos) {
    
}
function combinations(str) {
    var fn = function (rest, a) {
        for (var i = 0; i < rest.length; i++)
            a.push(rest[i]);
        return a;
    }
    return fn(str, []);
}
function Buyer(a, b) {
    //    $('#seller').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`);
    $('#buyer').append('<div class="buyercell-container"></div>');
    $('.buyercell-container').append('<div class="cell-top"></div>');
    for (var j = 0; j < a; j++) {
        element = String.fromCharCode(j + 65);
        $('.buyercell-container').append('<div class="cell-top">'+element+'</div>');
    }
    for (var i = 0; i < b; i++) {
        $('#buyer').append('<div class="buyercell-container"></div>');
        element = String.fromCharCode(i + 73);
        $('.buyercell-container').last().append('<div class="cell-top">' + element + '</div>');
        for (var j = 0; j < a; j++) {
            element = String.fromCharCode(j+65)+String.fromCharCode(i + 73);
            $('.buyercell-container').last().append('<div class="cell-bottom"><input id="' + element + '" type="number" value="0"></div>');
        }
    }
}
function rec() {
    //    $('#seller').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`);
    a = parseInt($('#sellers :selected').val());
    b = parseInt($('#buyers :selected').val());
    $('#matching').append('<div class="result-container"></div>');
    for (var j = 0; j < a; j++) {
        element = String.fromCharCode(j + 65);
        $('.result-container').append('<div class="cell-left">' + element + '</div>');
    }
    $('#matching').append('<div class="result-container"></div>');
    x = a;
    if (b > a)
        x = b;
    for (var i = 0; i < x; i++) {
        $('.result-container').last().append('<div class="cell-space"></div>');
    }
    $('#matching').append('<div class="result-container"></div>');
    for (var i = 0; i < b; i++) {
        element = String.fromCharCode(i + 73);
        $('.result-container').last().append('<div class="cell-right">' + element + '</div>');
    }
    $('#matching').width($('.result').width());
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}