tmp = [];
ans = [];
use = [];
Max = -1;
$(function () {
    $('#sellers').on('change', function (event) {
        $('#seller').html('');
        $('#matching').html('');
        combinations(Array.apply(undefined, Array(parseInt($('#sellers :selected').val()))).map(function (x, y) { return String.fromCharCode(y + 65); }).join('')).sort(function (a, b) { return a.length - b.length || a.localeCompare(b) }).forEach(element => $('#seller').append(`<div class="sellercell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`));
        $('#seller').width(90 * parseInt($('#sellers :selected').val()));
        $('#buyers').trigger('change');
        $('#seller-capacity').html('<option value = "1" selected > 1</option >');
        for (var i = 2; i < 10.0 / parseInt($('#sellers :selected').val()); i++) {
            element = '<option value = "' + String(i) + '">' + String(i) + '</option>';
            $('#seller-capacity').append(element);
        }
    });
    $('#buyers').on('change', function (event) {
        $('#buyer').html('');
        $('#matching').html('');
        $('#buyer-capacity').html('<option value = "1" selected > 1</option >');
        for (var i = 2; i < 10.0 / parseInt($('#buyers :selected').val()); i++) {
            element = '<option value = "' + String(i) + '">' + String(i) + '</option>';
            $('#buyer-capacity').append(element);
        }
        Buyer(parseInt($('#sellers :selected').val()), parseInt($('#buyers :selected').val()));
    });
    $('#random').on('click', function (event) {
        $('#sellers').trigger('change');
        x = $('.sellercell-container').toArray();
        for (var i = 0; i < x.length; i++) {
            y = $(x[i]).find('input').toArray();
            for (var j = 0; j < y.length; j++) {
                //alert('1');
                $(y[j]).val(randomIntFromInterval(1, 10));
            }
        }
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
        tmp = [];
        ans = [];
        use = [];
        Max = -1;
        buyer = [];
        mcapacity = parseInt($('#seller-capacity :selected').val());
        ncapacity = parseInt($('#buyer-capacity :selected').val());
        rec();
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
        //alert(String(ans));
        DFS(buyer, seller, 0);
        //alert(String(ans));
        svg = d3.select('#matching').append('svg');
        Y = $('#matching').offset().top;
        X = $('#matching').offset().left;
        $('svg').offset({ top: Y, left: X });
        $('svg').height($('#matching').height());
        $('svg').width($('#matching').width());
        //ans = [1, 2, 0]
        result();
        x = $('.cell-right').toArray();
        for (var i = 0; i < x.length; i++) {
            if (ans[i] == -1) continue;
            y1 = $(x[i]).offset().top + ($(x[i]).height()+3) / 2 - Y;
            x1 = $(x[i]).offset().left + 1 - X;
            y2 = $($('.cell-left')[ans[i]]).offset().top + ($($('.cell-left')[ans[i]]).height() + 3) / 2 - Y;
            x2 = $($('.cell-left')[ans[i]]).offset().left + $($('.cell-left')[ans[i]]).width() + 10 - X;
            svg.append('line').attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2).style('stroke', 'black').style('stroke-width', 5);
        }
    });
    $('#sellers').trigger('change');
    $('#buyers').trigger('change');
});
function result() {
    b = parseInt($('#buyers :selected').val());
    $('#matching').append('<div class="result-container"></div>');
    for (var i = 0; i < ans.length; i++) {
        element = "";
        for (var j = 0; j < a; j++) {
            if (j != ans[i%b]) {
                element = "#" + String.fromCharCode(j + 65) + String.fromCharCode(i + 73);
                $(element).css('color', 'black');
            }
        }
        element = "";
        if (ans[i] != -1) {
            element = "#" + String.fromCharCode(ans[i] + 65) + String.fromCharCode(i%b + 73);
            $(element).css('color', 'red');
            element = String(buyer[(i%b) * seller.length + ans[i]]) + ' - ' + String(seller[ans[i]]) + ' = ' + String(buyer[(i%b) * seller.length + ans[i]] - seller[ans[i]]);
        }
        //if (i < b) {
            $('.result-container').last().append('<div class="cell-bottom">' + element + '</div>');
        //}
    }
    dx = $('.result-container').last().height();
    $('#matching').append('<div class="result-container"></div>');
    $('.result-container').last().append('<div class="cell-top">Total</div>');
    $('.cell-top').last().width($('.cell-bottom').last().width())
    element = String(Max);
    $('.result-container').last().append('<div class="cell-bottom">' + element + '</div>');
    $('.result-container').last().height(max($('.result-container').first().height(), dx));
    $('.cell-bottom').last().height(max($('.result-container').first().height(),dx) - $('.cell-top').last().height()-26);
}
function max(a, b) {
    if (a > b) return a;
    return b;
}
function DFS(buyer, seller, pos) {
    if (pos == tmp.length) {
        var re = total(buyer, seller);
        if (Max <= re) {
            //alert(String(Max));
           // alert(String(re));
            //alert(String(ans));
          //  alert(String(tmp));
            Max = re;
            for (var i = 0; i < tmp.length; i++) {
                ans[i] = tmp[i];
            }
        }
        return;
    }
    tmp[pos] = -1;
    DFS(buyer, seller, pos + 1);
    for (var i = 0; i < seller.length; i++) {
        if (use[i] < mcapacity) {
            use[i] += 1;
            tmp[pos] = i;
            DFS(buyer, seller, pos + 1);
            use[i] -= 1;
        }
    }
    return;
}
function total(buyer, seller) {
    var re = 0;
    for (var i = 0; i < tmp.length; i++) {
        if (tmp[i] != -1)
            re += buyer[(i%b) * seller.length + tmp[i]] - seller[tmp[i]];
    }
    return re;
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
            element = "#" + element;
            $(element).css('color', 'black');
        }
    }
}
function rec() {
    $('#matching').html('');
    //    $('#seller').append(`<div class="cell-container"><div class="cell-top">${element}</div><div class="cell-bottom"><input id="${element}" type="number" value="0"></div></div>`);
    a = parseInt($('#sellers :selected').val());
    b = parseInt($('#buyers :selected').val());
    $('#matching').append('<div class="result-container"></div>');
    for (var j = 0; j < a; j++) {
        element = String.fromCharCode(j + 65);
        $('.result-container').append('<div class="cell-left">' + element + '</div>');
        use.push(0);
    }
    $('#matching').append('<div class="result-container"></div>');
    x = a;
    if (b > a)
        x = b;
    for (var i = 0; i < x; i++) {
        $('.result-container').last().append('<div class="cell-space"></div>');
    }
    $('#matching').append('<div class="result-container"></div>');
    for (var i = 0; i < ncapacity * b; i++) {
        element = String.fromCharCode(i%b + 73);
        $('.result-container').last().append('<div class="cell-right">' + element + '</div>');
    }
    for (var i = 0; i < ncapacity*b; i++) {
        tmp.push(0);
        ans.push(-1);
    }
    $('#matching').width($('.result').width());
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}