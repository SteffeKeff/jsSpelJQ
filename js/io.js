/////////////////////////////////////////////////////////////////////////////
// Name:        io.js
// Purpose:     Input/Output key event listener
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////

var io = {};
io.KB_ARROW_UP = 38;
io.KB_ARROW_DOWN = 40;
io.KB_ARROW_LEFT = 37;
io.KB_ARROW_RIGHT = 39;
io.KB_KEY_W = 87;
io.KB_KEY_S = 83;
io.KB_KEY_D = 65;
io.KB_KEY_A = 68;
io.addKeyListener = function (listener, handler) {
	$(listener).on('keydown', function (e) {
		handler(e.keyCode);
	});

};

io.addMouseListener = function (listener, handler) {
	$(listener).on('click', function (event) {
		handler();
	});

};

io.addMouseListener = function (listener, handler, data) {
	$(listener).on('click', function (event) {
		handler(data);
	});

};