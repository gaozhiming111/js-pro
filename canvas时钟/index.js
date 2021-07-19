let clock = document.getElementById('clock-canvas');
let clockS = document.getElementById('clock-s-hand');
let clockM = document.getElementById('clock-m-hand');
let clockH = document.getElementById('clock-h-hand');
let clockRule = document.getElementById('clock-ruling');
let clockRule2 = document.getElementById('clock-ruling2');
let clockText = document.getElementById('clock-text');

clock.width = clock.height = 800;
clockS.width = clockS.height = 800;
clockM.width = clockM.height = 800;
clockH.width = clockH.height =800;
clockRule.width = clockRule.height = 800;
clockRule2.width = clockRule2.height = 800;
clockText.width = clockText.height = 800;

initDialPlate();

//初始化表盘
function initDialPlate() {
	let angle = 30;
	let angle2 = 6;
	let x0 = 400, y0 = 400;
	let r0 = 385,r1 = 360,r2 = 20,r3 = 345,r4=330,r5=350, r = 320;
	let PI = 3.14;
	
	let pane = clock.getContext('2d');
	
	pane.strokeStyle = '#fff';
	pane.beginPath();
	pane.arc(x0,y0,r0,0,Math.PI * 2,true);
	pane.lineWidth = 25;
	pane.closePath();
	pane.stroke();
	
	pane.strokeStyle = '#fff';
	pane.beginPath();
	pane.arc(x0,y0,r1,0,Math.PI * 2,true);
	pane.lineWidth = 2;
	pane.closePath();
	pane.stroke();
	
	pane.fillStyle = '#fff';
	pane.beginPath();
	pane.arc(x0,y0,r2,0,Math.PI * 2,true);
	pane.closePath();
	pane.fill();
	
	//刻度
	let pane1 = clockRule.getContext('2d');
	pane1.strokeStyle = '#00ff99';
	for(let i = 0; i < 12; i++) {
		let _angle = angle * i;
		let x1 = x0 + r1 * Math.cos(_angle * PI / 180 );
		let y1 = y0 + r1 * Math.sin(_angle * PI / 180 );
		let x2 = x0 + r3 * Math.cos(_angle * PI / 180 );
		let y2 = y0 + r3 * Math.sin(_angle * PI / 180 );
		if(_angle === 0 || _angle === 90 || _angle === 180 || _angle === 270) {
			x2 = x0 + r4 * Math.cos(_angle * PI / 180 );
			y2 = y0 + r4 * Math.sin(_angle * PI / 180 );
			pane1.lineWidth = 4;
		}
		pane1.moveTo(x2,y2);
		pane1.lineTo(x1,y1);
		pane1.stroke();
	}
	
	let pane5 = clockRule2.getContext('2d');
	pane5.strokeStyle = '#00ff99';
	for(let i = 0; i < 60; i++) {
		let _angle2 = angle2 * i;
		let x1 = x0 + r1 * Math.cos(_angle2 * PI / 180 );
		let y1 = y0 + r1 * Math.sin(_angle2 * PI / 180 );
		let x2 = x0 + r5 * Math.cos(_angle2 * PI / 180 );
		let y2 = y0 + r5 * Math.sin(_angle2 * PI / 180 );
		pane5.moveTo(x2,y2);
		pane5.lineTo(x1,y1);
		pane5.stroke();
	}
	
	//文字
	let pane6 = clockText.getContext('2d');
	pane6.strokeStyle = '#fff';
	pane6.font = 'normal normal lighter 14px sans-serif';
	for(let i = 0; i < 12; i++) {
		let _angle3 = angle * (i - 2);
		let x = x0 + r * Math.cos(_angle3 * PI / 180 );
		let y = y0 + r * Math.sin(_angle3 * PI / 180 );
		pane6.strokeText(i+1, x, y);
	}
	
	//秒针 390,420,410,420, 402,90,398,90
	let pane2 = clockS.getContext('2d');
	pane2.fillStyle = '#00ccff';
	pane2.moveTo(390,420);
	pane2.lineTo(410,420);
	pane2.lineTo(402,90);
	pane2.lineTo(398,90);
	pane2.lineTo(390,420);
	pane2.fill();
	
	//分针 420,390,420,410, 140,402,140,398
	let pane3 = clockM.getContext('2d');
	pane3.fillStyle = '#ff9900';
	pane3.moveTo(420,390);
	pane3.lineTo(420,410);
	pane3.lineTo(140,402);
	pane3.lineTo(140,398);
	pane3.lineTo(420,390);
	pane3.fill();
	
	//时针 390,390,390,410,600,402,600,398
	let pane4 = clockH.getContext('2d');
	pane4.fillStyle = '#00ffcc';
	pane4.moveTo(390,390);
	pane4.lineTo(390,410);
	pane4.lineTo(600,402);
	pane4.lineTo(600,398);
	pane4.lineTo(390,390);
	pane4.fill();
	
	move();
}

//指针动画
function move() {
	let _Date = new Date();
	let _Y = _Date.getFullYear();
	let _Mon = _Date.getMonth() + 1;
	let _date = _Date.getDate();
	let _day = _Date.getDay();
	let _H = _Date.getHours();
	let _Mi = _Date.getMinutes();
	let _S = _Date.getSeconds();
	
	let angleS = 6,
	angleM = 6,
	angleH = 30; 
	clockS.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(angleS * _S)+'deg)');
	clockM.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(90 + angleM * (_Mi + _S / 60))+'deg)');
	clockH.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(-90 + angleH * (_H + _Mi / 60 + _S / 3600))+'deg)');
	
	setInterval(function() {
		let _Date = new Date();
		let _H = _Date.getHours();
		let _Mi = _Date.getMinutes();
		let _S = _Date.getSeconds();
		clockS.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(angleS * _S)+'deg)');
		clockM.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(90 + angleM * (_Mi + _S / 60))+'deg)');
		clockH.setAttribute('style', 'transform:translate(-400px,-400px) rotateZ('+(-90 + angleH * (_H + _Mi / 60 + _S / 3600))+'deg)');
	},1000);
}