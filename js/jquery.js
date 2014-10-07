$(function () {
	$('#play').on('click', function () {
		if ($('#name').val().trim() === '') {
			alert('your name is not valid');
		} else {
			$('#menu').hide();
			player.name = $('#name').val().trim();
			$('#playerName').text('Player name: ' + player.name);
			$('#game').show();
		}
	});
});