/////////////////////////////////////////////////////////////////////////////
// Name:        player.js
// Purpose:     Player data container
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-10-13
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
var player = {};
player.x = 0;
player.y = 0;
player.alive = true;
player.setStartPos = function (posX, posY) {
	player.x = posX;
	player.y = posY;
};
player.setStartPosFromLevel = function () {
	player.setStartPos(level.playerStartX[level.current], level.playerStartY[level.current]);
};
player.moveLeft = function () {
	player.x--;
};
player.moveRight = function () {
	player.x++;
};
player.moveUp = function () {
	player.y--;
};
player.moveDown = function () {
	player.y++;
};
player.kill = function () {
	player.alive = false;
	player.x = 0;
	player.y = 0;
};