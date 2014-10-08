/////////////////////////////////////////////////////////////////////////////
// Name:        level0.js
// Purpose:     Gameover screen
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
'use strict';
originLevel.mapH.push(11);
originLevel.mapW.push(32);
originLevel.playerStartX.push(15);
originLevel.playerStartY.push(9);
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
originLevel.map.push(addToLevel); //level.map[1][rowY][charX]