/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
$(function () {
	'use strict';
	level.current = 2;
	var runMain = false;
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
			$('#game').append('<p id="keyCode"></p>');
			$(window).on('keydown', function (e) {
				$('#keyCode').text(e.keyCode);
				logic.askMoveLocation(e.keyCode);
				ui.update(level);
			});
		}
	});
});