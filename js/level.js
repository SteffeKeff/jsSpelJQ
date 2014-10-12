/////////////////////////////////////////////////////////////////////////////
// Name:        level.js
// Purpose:     Game screens and levels body
// Authors:     Erik Welander, Stefan De Geer
// Modified:    2014-09-29
// Licence:     GNU GPL
/////////////////////////////////////////////////////////////////////////////
'use strict';
var level = {};
level.map = [];
level.mapH = [];
level.mapW = [];
level.playerStartX = [];
level.playerStartY = [];
level.current = 0;
level.getCopy = function(levelNum){return jQuery.extend(true, {}, level);}