var timer = {};
timer.startVal = 0;
timer.stopVal = 0;
timer.start = function () {
	timer.startVal = new Date().getTime();
};
timer.stop = function () {
	timer.startVal = 0;
	timer.stopVal = 0;
};

timer.time = function () {
	timer.endVal = new Date().getTime();
	var diffrence = (((timer.endVal - timer.startVal) / 1000)).toFixed(2);
	if(diffrence < 1e7)
		return diffrence;
	return 0;
};