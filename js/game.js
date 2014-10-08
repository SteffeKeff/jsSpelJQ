/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
var t1, t2, d1, d2, time, playing;
$(function () {
	'use strict';
	level.current = 0;
	playing = false;
	player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
	$('#play').on('click', function () {
		player.name = $('#name').val().trim();
		if (player.name === '') {
			$('#invalid').text('your name is not valid');
			//alert('your name is not valid');
		} else {
			$('#menu').hide();
			$('#player-name').text('Player name: ' + player.name);
			$('#game').show();
			$('#game').append('<table id="gameBoard"></table>');
			$('#gameBoard').addClass('center');
			ui.update(level);
			$('#game').append('<p id="timer">Timer: </p>');
			var myTimer = function () {
				d2 = new Date();
				t2 = d2.getTime();
				time = (((t2 - t1) / 1000)).toFixed(2);
				if (t1 !== undefined) {
					$("#timer").text('Timer: ' + time);
				}
			};
			var myVar = setInterval(function () {
				myTimer();
			}, 100);
			$(window).on('keydown', function (e) {
				if (!playing) {
					d1 = new Date();
					t1 = d1.getTime();
					playing = true;
				}
				logic.askMoveLocation(e.keyCode);
				ui.update(level);
			});
		}
	});
});