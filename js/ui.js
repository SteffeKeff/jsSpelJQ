/////////////////////////////////////////////////////////////////////////////
// Name:        ui.js
// Purpose:     User interface calls
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
'use strict';
var ui = {};
ui.input = function (ask) {
	return prompt(ask);
};
ui.output = function (tell) {
	console.log(tell);
};
ui.update = function (level) {
	$('tr').each(function () {
		$(this).remove();
	});
	for (var i = 0; i < level.mapH[level.current]; i++) {
		$('#gameBoard').append('<tr></tr>');
		for (var j = 0; j < level.mapW[level.current]; j++) {
			if (level.map[level.current][i][j] === '#') {
				$('tr').eq(i).append('<td><img src="img/rock.png" alt="rock"></td>');
			} else if (level.map[level.current][i][j] === '@') {
				$('tr').eq(i).append('<td><img src="img/doodle.png" alt="doodle"></td>');
			} else if (level.map[level.current][i][j] === '*') {
				$('tr').eq(i).append('<td><img src="img/bomb.png" alt="bomb"></td>');
			} else if (level.map[level.current][i][j] === '$') {
				$('tr').eq(i).append('<td><img src="img/money.png" alt="money"></td>');
			} else if (level.map[level.current][i][j] === '.') {
				$('tr').eq(i).append('<td><img src="img/footprint.png" alt="footprint"></td>');
			} else {
				$('tr').eq(i).append('<td><img src="img/grass.gif" alt="grass"></td>');
			}
		}
	}
}