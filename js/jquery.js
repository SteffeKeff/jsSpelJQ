$(function () {
	$('#play').on('click', function () {
		if ($('#name').val().trim() === '') {
			alert('your name is not valid');
		} else {
			$('#menu').hide();
			player.name = $('#name').val().trim();
			$('#playerName').text('Player name: ' + player.name);
			$('#game').show();
			$('#game').append('<table id="gameBoard"></table>');
			$('#gameBoard').addClass('center');
			// for (var j = 0; j < 37; j++) {
			// 	$('tr').append('<td>' + level.map[0][0][j] + '</td>');
			// }
		}
	});
});