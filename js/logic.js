/////////////////////////////////////////////////////////////////////////////
// Name:        level.js
// Purpose:     Game screens and levels body
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
'use strict';
var logic = {};
logic.askMoveLocation = function (key) {
    var where = 0;
    switch (key) {
    case 65:
    case 37:
        where = 0;
        break;
    case 68:
    case 39:
        where = 1;
        break;
    case 87:
    case 38:
        where = 2;
        break;
    case 83:
    case 40:
        where = 3;
        break;
    default:
        where = -1;
        break;
    }
    logic.movement.movePlayer(where);
};

logic.setPlayer = function () {
    level.map[level.current][player.y] =
        level.map[level.current][player.y].substring(0, player.x) + "@" +
        level.map[level.current][player.y].substring(player.x + 1, level.map[level.current][player.y].length);
};


logic.setVisited = function () {
    level.map[level.current][player.y] =
        level.map[level.current][player.y].substring(0, player.x) + "." +
        level.map[level.current][player.y].substring(player.x + 1, level.map[level.current][player.y].length);
};


logic.gameLost = function () {
    $(window).off('keydown');
    runTime = false;
    start = false;
    player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
    $('#game').append('<button id="next" class="center myButton">To Menu</button>');
    $('#next').on('click', function () {
        level.current = 0;
        time = '0.00';
        $('#timer').remove();
        $('#next').remove();
        $('#game').hide();
        $('#menu').show();
        level = jQuery.extend(true, {}, originLevel);
    });
};

logic.gameWon = function () {
    $(window).off('keydown');
    console.log(time);
    start = false;
    runTime = false;
    if (parseInt(level.current) !== (level.map.length - 1)) {
        $('#game').append('<button id="next" class="center myButton">Next level</button>');
        $('#next').on('click', function () {
            level.current++;
            time = '0.00';
            $('#timer').text('Timer: 0.00');
            player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
            $('#next').remove();
            ui.update(level);
            $(window).on('keydown', function (e) {
                if (!start) {
                    d1 = new Date();
                    t1 = d1.getTime();
                    start = true;
                    runTime = true;
                }
                logic.askMoveLocation(e.keyCode);
                ui.update(level);
            });
        });
    } else {
        $('#game').append('<button id="next" class="center myButton">To Menu</button>');
        $('#next').on('click', function () {
            level.current = 0;
            time = '0.00';
            level = jQuery.extend(true, {}, originLevel);
            $('#timer').text('Timer: 0.00');
            $('#next').remove();
            $('#game').hide();
            $('#menu').show();
        });
    }
};

logic.sleep = function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};