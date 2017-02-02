setInterval(Interval, 60*1000)

var now = new Date().getTime();
var IntervalTime = 0;
function Interval() {
	IntervalTime += 60;
}
postMessage(JSON.stringify({now: now}));

function onmessage(oEvent) {
  	postMessage(JSON.stringify({now: now, IntervalTime: IntervalTime}));
};