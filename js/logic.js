/////////////////////////////////////////////////////////////////////////////
// Name:        game.playlevel.js
// Purpose:     Game screens and game.playlevels body
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
var logic = {};

logic.moveLocation = function (key) {
    var where = 0;
    switch (key) {
    case io.KB_KEY_D:
    case io.KB_ARROW_LEFT:
        where = 0;
        break;
    case io.KB_KEY_A:
    case io.KB_ARROW_RIGHT:
        where = 1;
        break;
    case io.KB_KEY_W:
    case io.KB_ARROW_UP:
        where = 2;
        break;
    case io.KB_KEY_S:
    case io.KB_ARROW_DOWN:
        where = 3;
        break;
    default:
        where = -1;
        break;
    }
    logic.movement.movePlayer(where);
};

logic.setPlayer = function () {
    game.playlevel.map[game.playlevel.current][player.y] =
        game.playlevel.map[game.playlevel.current][player.y].substring(0, player.x) + "@" +
        game.playlevel.map[game.playlevel.current][player.y].substring(player.x + 1, game.playlevel.map[game.playlevel.current][player.y].length);
};

logic.setVisited = function () {
    game.playlevel.map[game.playlevel.current][player.y] =
        game.playlevel.map[game.playlevel.current][player.y].substring(0, player.x) + "." +
        game.playlevel.map[game.playlevel.current][player.y].substring(player.x + 1, game.playlevel.map[game.playlevel.current][player.y].length);
};

logic.gameLost = function () {
    game.runTime = false;
    timer.stop();
    $(window).off('keydown');
    player.setStartPos(game.playlevel.playerStartX[game.playlevel.current], game.playlevel.playerStartY[game.playlevel.current]);
    $('#game').append('<button id="next" class="center myButton">To Menu</button>');
    $('#next').on('click', function () {
        game.playlevel.current = 0;
        $('#next').remove();
        $('#game').hide();
        $('#menu').show();
        game.playlevel = jQuery.extend(true, {}, level);
    });
    $(window).on('keypress', function (e) {
        if (e.keyCode === 13) {
            $(window).off('keypress');
            game.playlevel.current = 0;
            $('#next').remove();
            $('#game').hide();
            $('#menu').show();
            game.playlevel = game.playlevel.getCopy();
        }
    });
};

logic.gameWon = function () {
    timer.stop();
    game.runTime = false;
    $(window).off('keydown');
    if (parseInt(game.playlevel.current) !== (game.playlevel.map.length - 1)) {
        $('#game').append('<button id="next" class="center myButton">Next level</button>');
        $(window).on('keypress', function (e) {
            if (e.keyCode === 13) {
                game.playlevel.current++;
                $('#timer').text('Timer: 0.00');
                player.setStartPos(game.playlevel.playerStartX[game.playlevel.current], game.playlevel.playerStartY[game.playlevel.current]);
                $('#next').remove();
                ui.update(game.playlevel);
                $(window).off('keypress');
                $(window).on('keydown', function (e) {
                    game.update(e.keyCode);
                });
            }
        });
        $('#next').on('click', function () {
            game.playlevel.current++;
            $('#timer').text('Timer: 0.00');
            player.setStartPos(game.playlevel.playerStartX[game.playlevel.current], game.playlevel.playerStartY[game.playlevel.current]);
            $('#next').remove();
            ui.update(game.playlevel);
            $(window).off('keypress');
            $(window).on('keydown', function (e) {
                game.update(e.keyCode);
            });
        });
    } else {
        $('#game').append('<button id="next" class="center myButton">To Menu</button>');
        $('#next').on('click', function () {
            game.playlevel.current = 0;
            game.playlevel = jQuery.extend(true, {}, level);
            $('#timer').text('Timer: 0.00');
            $('#next').remove();
            $('#game').hide();
            $('#menu').show();
        });
        $(window).on('keypress', function (e) {
            if (e.keyCode === 13) {
                game.playlevel.current = 0;
                game.playlevel = jQuery.extend(true, {}, level);
                $(window).off('keypress');
                $('#next').remove();
                $('#game').hide();
                $('#menu').show();
            }
        });
    }
};