/////////////////////////////////////////////////////////////////////////////
// Name:        level0.js
// Purpose:     Gameover screen
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-10-13
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
level.mapH.push(11);
level.mapW.push(32);
level.playerStartX.push(15);
level.playerStartY.push(9);
var addToLevel = [];
addToLevel.push('################################'); //0
addToLevel.push('#              $               #'); //1
addToLevel.push('#                              #'); //2
addToLevel.push('#                              #'); //3
addToLevel.push('#                              #'); //4
addToLevel.push('#              *               #'); //5
addToLevel.push('#                              #'); //6
addToLevel.push('#                              #'); //7
addToLevel.push('#                              #'); //8
addToLevel.push('#              @               #'); //9
addToLevel.push('################################'); //10
level.map.push(addToLevel); //level.map[1][rowY][charX]