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
		playlevel.current = $('#level').val();
		player.setStartPosFromLevel();
		timer.stop();
		$('#invalid').text('');
		$('#menu').fadeOut();
		$('#player-name').text('Player name: ' + player.name);
		$('#game').show();
		$('#gameBoard').addClass('center');
		ui.update(game.playlevel);

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
	}
};

$(function () {
	'use strict';
	ui.fillList('#level', game.playlevel.map.length, 'Level');
	player.setStartPosFromLevel();
	//player.setStartPosFromLevel();
	//player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
	$('#play-button').on('click', function () {
		player.name = $('#name').val().trim();
		if (player.name === '') {
			$('#invalid').text('your name is not valid');
		} else {
			game.playlevel = jQuery.extend(true, {}, level); //copy the originLevel to level
			game.playlevel.current = $('#level').val();
			player.setStartPos(game.playlevel.playerStartX[game.playlevel.current], game.playlevel.playerStartY[game.playlevel.current]);
			time = 0;
			$('#invalid').text('');
			$('#menu').fadeOut();
			$('#player-name').text('Player name: ' + player.name);
			$('#game').show();
			ui.update(game.playlevel);
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
			var myTimer = function () {
				if (runTime) {
					d2 = new Date();
					t2 = d2.getTime();
					time = (((t2 - t1) / 1000)).toFixed(2);
				}
				if (t1 !== undefined) {
					$("#timer").text('Timer: ' + time);
				}
			};
			var myVar = setInterval(function () {
				myTimer();
			}, 100);
			$(window).on('keydown', function (e) {
				if (!start) {
					d1 = new Date();
					t1 = d1.getTime();
					start = true;
					runTime = true;
				}
				logic.askMoveLocation(e.keyCode);
				ui.update(game.playlevel);
			});
		}
	});
	$('#tutorial-button').on('click', function () {
		$('#menu').fadeOut();
		$('#tutorial').show();
		$('#next').on('click', function () {
			$('#tutorial').fadeOut();
			$('#menu').fadeIn();
		});
	});
});