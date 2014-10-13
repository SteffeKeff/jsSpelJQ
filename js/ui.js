/////////////////////////////////////////////////////////////////////////////
// Name:        ui.js
// Purpose:     User interface calls
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
var ui = {};

ui.isMobile = function () {
	return screen.width <= 768;
};

ui.update = function (playlevel) {
	$('tr').each(function () {
		$(this).remove();
	});
	for (var i = 0; i < playlevel.mapH[playlevel.current]; i++) {
		$('#gameBoard').append('<tr></tr>');
		for (var j = 0; j < playlevel.mapW[playlevel.current]; j++) {
			if (playlevel.map[playlevel.current][i][j] === '#') {
				$('tr').eq(i).append('<td><img src="img/rock.png" alt="rock"></td>');
			} else if (playlevel.map[playlevel.current][i][j] === '@') {
				$('tr').eq(i).append('<td><img src="img/player.png" alt="player"></td>');
			} else if (playlevel.map[playlevel.current][i][j] === '*') {
				$('tr').eq(i).append('<td><img src="img/bomb.png" alt="bomb"></td>');
			} else if (playlevel.map[playlevel.current][i][j] === '$') {
				$('tr').eq(i).append('<td><img src="img/money.png" alt="money"></td>');
			} else if (playlevel.map[playlevel.current][i][j] === '.') {
				$('tr').eq(i).append('<td><img src="img/footprint.png" alt="footprint"></td>');
			} else {
				$('tr').eq(i).append('<td><img src="img/grass.gif" alt="grass"></td>');
			}
		}
	}
};

ui.fillList = function (id, length, text) {
	for (var i = 0; i < length; i++) {
		$(id).append('<option value="' + i + '">' + text + ' ' + (i + 1) + ' </option>');
	}
};