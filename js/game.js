/////////////////////////////////////////////////////////////////////////////
// Name:        game.js
// Purpose:     Game mainframe
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
$(function () {
	'use strict';
	//ui.output(level.toString(level.current));
	//ui.popup('Starta spelet?');
	//ui.clear();
	level.current = 2;
	var runMain = false;
	//player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
	$('#play').on('click', function () {
		player.name = $('#name').val().trim();
		if (player.name === '') {
			alert('your name is not valid');
		} else {
			$('#menu').hide();
			$('#player-name').text('Player name: ' + player.name);
			$('#game').show();
			$('#game').append('<table id="gameBoard"></table>');
			$('#gameBoard').addClass('center');
			for (var i = 0; i < 11; i++) {
				$('#gameBoard').append('<tr></tr>');
				for (var j = 0; j < 32; j++) {
					$('tr').eq(i).append('<td>' + level.map[level.current][i][j] + '</td>');
				}
			}
			$(window).on('keydown', function (e) {
				$('#keyCode').text(e.keyCode);
			});
			$('#game').append('<p id="keyCode"></p>');
			var runMain = true;
			while (runMain) {
				alert('hej');
			}
			// 	//console.log(level.toString(level.current));
			// 	//logic.askMoveLcation();
		}
	});
});