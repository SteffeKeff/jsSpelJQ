/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
var t1, t2, d1, d2, time, start, runTime, level;
level = jQuery.extend(true, {}, originLevel);
$(function () {
	'use strict';
	for (var i = 0; i < level.map.length; i++) {
		$('#level').append('<option value="' + i + '">Level ' + (i + 1) + '</option>');
	}
	start = false;
	player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
	$('#play').on('click', function () {
		level.current = $('#level').val();
		player.name = $('#name').val().trim();
		if (player.name === '') {
			$('#invalid').text('your name is not valid');
		} else {
			time = 0;
			$('#invalid').text('');
			$('#menu').fadeOut();
			$('#player-name').text('Player name: ' + player.name);
			$('#game').show();
			$('#game').append('<table id="gameBoard"></table>');
			$('#gameBoard').addClass('center');
			ui.update(level);
			$('#game').append('<p id="timer">Timer: 0.00</p>');
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
				ui.update(level);
			});
		}
	});
});