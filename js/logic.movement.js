/////////////////////////////////////////////////////////////////////////////
// Name:        logic.movement.js
// Purpose:     Manages everything related to a movement by a character
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-10-13
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
logic.movement = {};
logic.movement.movePlayer = function (where) {
    switch (where) {
    case -1:
        break;
    case 0: //left
        if (logic.movement.collision(player.x - 1, player.y)) {
            logic.movement.handleCollision(player.x - 1, player.y);
        } else {
            if (!game.runTime) {
                timer.start();
                game.runTime = true;
            }
            logic.setVisited();
            player.moveLeft();
            logic.setPlayer();
        }
        break;
    case 1: //right
        if (logic.movement.collision(player.x + 1, player.y)) {
            logic.movement.handleCollision(player.x + 1, player.y);
        } else {
            if (!game.runTime) {
                timer.start();
                game.runTime = true;
            }
            logic.setVisited();
            player.moveRight();
            logic.setPlayer();
        }
        break;
    case 2: //up
        if (logic.movement.collision(player.x, player.y - 1)) {
            logic.movement.handleCollision(player.x, player.y - 1);
        } else {
            if (!game.runTime) {
                timer.start();
                game.runTime = true;
            }
            logic.setVisited();
            player.moveUp();
            logic.setPlayer();
        }
        break;
    case 3: //down
        if (logic.movement.collision(player.x, player.y + 1)) {
            logic.movement.handleCollision(player.x, player.y + 1);
        } else {
            if (!game.runTime) {
                timer.start();
                game.runTime = true;
            }
            logic.setVisited();
            player.moveDown();
            logic.setPlayer();
        }
        break;
    default:
        break;
    }

};

logic.movement.collision = function (posX, posY) {
    if (game.playlevel.map[game.playlevel.current][posY][posX] == '*' ||
        game.playlevel.map[game.playlevel.current][posY][posX] == '#' ||
        game.playlevel.map[game.playlevel.current][posY][posX] == '$') {
        return true;
    }
    return false;
};

logic.movement.getCollisionItem = function (posX, posY) {
    return game.playlevel.map[game.playlevel.current][posY][posX];
};

logic.movement.handleCollision = function (posX, posY) {
    var collisionIntem = logic.movement.getCollisionItem(posX, posY);
    if (collisionIntem == '*') {
        player.kill();
        logic.gameLost();
    }
    if (collisionIntem == '$') {
        logic.gameWon();
    }
};