/////////////////////////////////////////////////////////////////////////////
// Name:        playlevel.js
// Purpose:     Game screens and playlevels body
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
    playlevel.map[playlevel.current][player.y] =
        playlevel.map[playlevel.current][player.y].substring(0, player.x) + "@" +
        playlevel.map[playlevel.current][player.y].substring(player.x + 1, playlevel.map[playlevel.current][player.y].length);
};


logic.setVisited = function () {
    playlevel.map[playlevel.current][player.y] =
        playlevel.map[playlevel.current][player.y].substring(0, player.x) + "." +
        playlevel.map[playlevel.current][player.y].substring(player.x + 1, playlevel.map[playlevel.current][player.y].length);
};


logic.gameLost = function () {
    $(window).off('keydown');
    runTime = false;
    start = false;
    player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
    $('#game').append('<button id="next" class="center myButton">To Menu</button>');
    $('#next').on('click', function () {
        playlevel.current = 0;
        time = '0.00';
        $('#timer').remove();
        $('#next').remove();
        $('#game').hide();
        $('#menu').show();
        playlevel = jQuery.extend(true, {}, originplaylevel);
    });
    $(window).on('keypress', function (e) {
        if (e.keyCode === 13) {
            $(window).off('keypress');
            playlevel.current = 0;
            time = '0.00';
            $('#timer').remove();
            $('#next').remove();
            $('#game').hide();
            $('#menu').show();
            playlevel = playlevel.getCopy();
        }
    });
};

logic.gameWon = function () {
    $(window).off('keydown');
    console.log(time);
    start = false;
    runTime = false;
    if (parseInt(playlevel.current) !== (playlevel.map.length - 1)) {
        $('#game').append('<button id="next" class="center myButton">Next level</button>');
        $(window).on('keypress', function (e) {
            if (e.keyCode === 13) {
                playlevel.current++;
                time = '0.00';
                $('#timer').text('Timer: 0.00');
                player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
                $('#next').remove();
                ui.update(playlevel);
                $(window).off('keypress');
                $(window).on('keydown', function (e) {
                    if (!start) {
                        d1 = new Date();
                        t1 = d1.getTime();
                        start = true;
                        runTime = true;
                    }
                    logic.askMoveLocation(e.keyCode);
                    ui.update(playlevel);
                });
            }
        });
        $('#next').on('click', function () {
            playlevel.current++;
            time = '0.00';
            $('#timer').text('Timer: 0.00');
            player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
            $('#next').remove();
            ui.update(playlevel);
            playlevel = playlevel.getCopy();
            $(window).off('keypress');
            $(window).on('keydown', function (e) {
                if (!start) {
                    d1 = new Date();
                    t1 = d1.getTime();
                    start = true;
                    runTime = true;
                }
                logic.askMoveLocation(e.keyCode);
                ui.update(playlevel);
            });
        });
    } else {
        $('#game').append('<button id="next" class="center myButton">To Menu</button>');
        $('#next').on('click', function () {
            playlevel.current = 0;
            time = '0.00';
            playlevel = jQuery.extend(true, {}, originplaylevel);
            $('#timer').text('Timer: 0.00');
            $('#next').remove();
            $('#game').hide();
            $('#menu').show();
        });
        $(window).on('keypress', function (e) {
            if (e.keyCode === 13) {
                playlevel.current = 0;
                time = '0.00';
                playlevel = jQuery.extend(true, {}, originplaylevel);
                $(window).off('keypress');
                $('#timer').remove();
                $('#next').remove();
                $('#game').hide();
                $('#menu').show();
            }
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