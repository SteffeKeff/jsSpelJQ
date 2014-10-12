/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////

var t1, t2, d1, d2, time, start, runTime;

var playlevel = level.getCopy();
$(function () {
	'use strict';
	for (var i = 0; i < playlevel.map.length; i++) {
		$('#level').append('<option value="' + i + '">Level ' + (i + 1) + '</option>');
	}
	var click = function (button) {
		if (!start) {
			d1 = new Date();
			t1 = d1.getTime();
			start = true;
			runTime = true;
		}
		logic.askMoveLocation(button);
		ui.update(playlevel);
	};
	start = false;
	player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
	$('#play').on('click', function () {
		player.name = $('#name').val().trim();
		if (player.name === '') {
			$('#invalid').text('your name is not valid');
		} else {
			playlevel = jQuery.extend(true, {}, level); //copy the originLevel to level
			playlevel.current = $('#level').val();
			player.setStartPos(playlevel.playerStartX[playlevel.current], playlevel.playerStartY[playlevel.current]);
			time = 0;
			$('#invalid').text('');
			$('#menu').fadeOut();
			$('#player-name').text('Player name: ' + player.name);
			$('#game').show();
			$('#game').append('<table id="gameBoard"></table>');
			$('#gameBoard').addClass('center');
			ui.update(playlevel);
			$('#game').append('<p id="timer">Timer: 0.00</p>');
			if ($('#buttons').length === 0) { //Check if buttons already exists
				if (ui.isMobile) {
					$('#game').append('<div id="buttons"></div>');
					$('#buttons').append('<button id="button-up" class="arrow-key">⇡</button>');
					$('#buttons').append('<button id="button-left" class="arrow-key">⇠</button>');
					$('#buttons').append('<button id="button-down" class="arrow-key">⇣</button>');
					$('#buttons').append('<button id="button-right" class="arrow-key">⇢</button>');
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
				ui.update(playlevel);
			});
		}
	});
});