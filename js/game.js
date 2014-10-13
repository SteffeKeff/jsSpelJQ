/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////

var game = {};
game.playlevel = level.getCopy();
game.runTime = false;
io.addMouseListener('#play-button', game.validateName);

game.update = function (keycode) {
	setInterval(function () { //Update timer text 10 times/second if timer.time is not 0
		if (timer.time() !== 0) {
			$('#timer').text('Timer: ' + timer.time());
		}
	}, 100);
	if (!game.runTime) {
		timer.start();
		game.runTime = true;
	}
	logic.moveLocation(keycode);
	ui.update(game.playlevel);
};

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
		io.addKeyListener(window, game.update);
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
			io.addMouseListener('#button-left', game.update, io.KB_ARROW_LEFT);
			io.addMouseListener('#button-right', game.update, io.KB_ARROW_RIGHT);
			io.addMouseListener('#button-up', game.update, io.KB_ARROW_UP);
			io.addMouseListener('#button-down', game.update, io.KB_ARROW_DOWN);
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