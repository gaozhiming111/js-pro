const yearDiv = document.getElementById('year');
const monthDiv = document.getElementById('month');
const dateDiv = document.getElementById('date');
const hoursDiv = document.getElementById('hours');
const minutesDiv = document.getElementById('minutes');
const secondsDiv = document.getElementById('seconds');


setData();

//数据设置
function setData() {
	let _Date = new Date();
	let curYear = _Date.getFullYear();
	let curMonth = _Date.getMonth() + 1;
	
	const month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];		//月数据
	let date = [], 		//日数据
		hours = [], 		//时
		minutes = [], 			//分
		seconds = [],			//秒
		dateFg = getDate(curYear, curMonth);			
	
	for(let i = 1; i <= dateFg; i++) {
		date.push(i + '日');
	}
	
	for(let i = 0; i <= 23; i++) {
		hours.push(i + '时');
	}
	
	for(i = 0; i <= 59; i++) {
		minutes.push(i + '分');
		seconds.push(i + '秒');
	}
	
	setHtml(curYear, month, date, hours, minutes, seconds);
	// console.log(curYear, month, date, hours, minutes, seconds);
}
//设置Html
function setHtml(curYear, month, date, hours, minutes, seconds) {
	let monthHtml = '',
		dateHtml = '';
		hoursHtml = '';
		minutesHtml = '';
		secondsHtml = '';
		
	let rotateMo = 360 / month.length,
		rotateD = 360 / date.length,
		rotateH = 360 / hours.length,
		rotateMi = 360 / minutes.length;
		rotateS = 360 / seconds.length;
	
	for(let i = 0; i < month.length; i++) {
		monthHtml += '<div id="month'+(i + 1)+'" class="monthItem" style="transform: rotate('+rotateMo * i+'deg);">'+ month[i] +'</div>';
	}
	
	for(let i = 0; i < date.length; i++) {
		dateHtml += '<div id="date'+(i + 1)+'" class="dateItem" style="transform: rotate('+rotateD * i+'deg);">'+ date[i] +'</div>';
	}
	
	for(let i = 0; i < hours.length; i++) {
		hoursHtml += '<div id="hour'+(i + 1)+'" class="hourItem" style="transform: rotate('+rotateH * i+'deg);">'+ hours[i] +'</div>';
	}
	
	for(let i = 0; i < minutes.length; i++) {
		minutesHtml += '<div id="minute'+(i + 1)+'" class="minuteItem" style="transform: rotate('+rotateMi * i+'deg);">'+ minutes[i] +'</div>';
		secondsHtml += '<div id="second'+(i + 1)+'" class="secondItem" style="transform: rotate('+rotateS * i+'deg);">'+ seconds[i] +'</div>';
	}
	
	yearDiv.innerHTML = curYear + '年';
	monthDiv.innerHTML = monthHtml;
	dateDiv.innerHTML = dateHtml;
	hoursDiv.innerHTML = hoursHtml;
	minutesDiv.innerHTML = minutesHtml;
	secondsDiv.innerHTML = secondsHtml;
	
	//设置定时器
	setTimer(rotateMo, rotateD, rotateH, rotateMi, rotateS, date);
}

//定时函数
function setTimer(monthDeg, dateDeg, hourDeg, minuteDeg, secondDeg, date) {
	let _secondDeg = secondDeg;
	let _minuteDeg = minuteDeg;
	let _hourDeg = hourDeg;
	let _dateDeg = dateDeg;
	let _monthDeg = monthDeg;
	let monfg = 0, datefg = 0, hfg = 0, mfg = 0, sfg = 0;
	let _secondDeg2 = 0, _minuteDeg2 = 0, _hourDeg2 = 0, _dateDeg2 = 0, _monthDeg2 = 0;
	setInterval(function() {
		let _Date2 = new Date();
		let _year = _Date2.getFullYear();
		let _month = _Date2.getMonth() + 1;
		let _date = _Date2.getDate();
		let _hours = _Date2.getHours() + 1;
		let _minutes = _Date2.getMinutes() + 1;
		let _seconds = _Date2.getSeconds() + 1;
		
		if(_month == 1) {
			monfg++;
			_monthDeg2 = -(monfg * 360);
		}
		
		if(_date == 1) {
			datefg++;
			_dateDeg2 = -(datefg * 360);
		}
		
		if(_hours == 1) {
			hfg++;
			_hourDeg2 = -(hfg * 360);
		}
		
		if(_minutes == 1) {
			mfg++;
			_minuteDeg2 = -(mfg * 360);
		}
		
		if(_seconds == 1) {
			sfg++;
			_secondDeg2 = -(sfg * 360);
		}
		
		console.log(_year, _month, _date, _hours, _minutes, _seconds);
		secondsDiv.style.transform = 'rotate('+ ((_seconds * (-_secondDeg) + _secondDeg) + _secondDeg2) + 'deg)';
		minutesDiv.style.transform = 'rotate('+ ((_minutes * (-_minuteDeg) + _minuteDeg) + _minuteDeg2) + 'deg)';
		hoursDiv.style.transform = 'rotate('+ ((_hours * (-_hourDeg) + _hourDeg) + _hourDeg2) + 'deg)';
		dateDiv.style.transform = 'rotate('+ ((_date * (-_dateDeg) + _dateDeg) + _dateDeg2) + 'deg)';
		monthDiv.style.transform = 'rotate('+ ((_month * (-_monthDeg) + _monthDeg) + _monthDeg2 ) + 'deg)';
		
		let monthItem = document.getElementsByClassName('monthItem');
		let dateItem = document.getElementsByClassName('dateItem');
		let hourItem = document.getElementsByClassName('hourItem');
		let minuteItem = document.getElementsByClassName('minuteItem');
		let secondItem = document.getElementsByClassName('secondItem');
		for(let i = 0; i < monthItem.length; i++) {
			monthItem[i].style.color = "#fff";
		}
		for(let i = 0; i < secondItem.length; i++) {
			secondItem[i].style.color = "#fff";
		}
		for(let i = 0; i < hourItem.length; i++) {
			hourItem[i].style.color = "#fff";
		}
		for(let i = 0; i < minuteItem.length; i++) {
			minuteItem[i].style.color = "#fff";
		}
		for(let i = 0; i < secondItem.length; i++) {
			secondItem[i].style.color = "#fff";
		}
		
		document.getElementById('month' + _month).style.color = "#DD0000";
		document.getElementById('date' + _date).style.color = "#DD0000";
		document.getElementById('hour' + _hours).style.color = "#DD0000";
		document.getElementById('minute' + _minutes).style.color = "#DD0000";
		document.getElementById('second' + _seconds).style.color = "#DD0000";
	},1000);
}

//天数获取
function getDate(year, month) {
	let _year = parseInt(year);
	let _month = parseInt(month);
	let curDate;
	if(_month == 1 || _month == 3 || _month == 5 || _month == 7 
	|| _month == 8 || _month == 10 || _month == 12) {
		curDate = 31;
	} else if(_month == 4 || _month == 6 || _month == 9 || _month == 11) {
		curDate = 30;
	} else {
		if(_year / 4 == 0 && _year / 100 !== 0) {
			if(_year / 4 == 0) {
				curDate = 29;
			}else {
				curDate = 28;
			}
		}else if(_year / 400 == 0) {
			curDate = 29;
		}else {
			curDate = 28;
		}
	}
	return curDate;
}