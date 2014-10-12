/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////

var t1, t2, d1, d2, time, start, runTime;


var game = {};
game.playlevel = level.getCopy();
game.runTime = false;

game.update = function (keycode) {
	$('#timer').text('Timer: ' + timer.time());
	if (!game.runTime) {
		timer.start();
		game.runTime = true;
	}
	logic.askMoveLocation(keycode);
	ui.update(game.playlevel);
};
io.addKeyListener(window, game.update);
io.addMouseListener('#play-button', game.validateName);


game.validateName = function () {
	player.name = $('#name').val().trim();
	if (player.name === '') {
		$('#invalid').text('your name is not valid');
		return false;
	} else
		return true;
};

game.run = function () {
	if (game.validateName()) {
		game.playlevel = level.getCopy();
		game.playlevel.current = $('#level').val();
		player.setStartPosFromLevel();
		$('#invalid').text('');
		$('#menu').fadeOut();
		$('#player-name').text('Player name: ' + player.name);
		$('#game').show();
		$('#gameBoard').addClass('center');
		if (ui.isMobile()) {
			$('#buttons').show();
			$('#button-left').on('click', function () {
				click(37);
			});
			$('#button-right').on('click', function () {
				console.log('right');
				click(39);
			});
			$('#button-up').on('click', function () {
				console.log('up');
				click(38);
			});
			$('#button-down').on('click', function () {
				click(40);
			});
		}
		game.update();
	}
};
game.tutorial = function () {
	$('#menu').fadeOut();
	$('#tutorial').show();
	$('#next').on('click', function () {
		$('#tutorial').fadeOut();
		$('#menu').fadeIn();
	});
};

$(function () {
	'use strict';
	ui.fillList('#level', game.playlevel.map.length, 'Level');
	player.setStartPosFromLevel();

	$('#play-button').on('click', function () {
		game.run();
	});
	$('#tutorial-button').on('click', function () {
		game.tutorial();
	});
});