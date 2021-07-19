let clock = document.getElementById('clock-svg');
let clockS = document.getElementById('clock-s-hand');
let clockM = document.getElementById('clock-m-hand');
let clockH = document.getElementById('clock-h-hand');

window.onload = function() {
	initDialPlate();
}
/*
求圆上点的坐标需要已知的条件：圆心、半径、角度
假设圆心:o (x0,y0)
半径:r
角度:angle

x1 = x0 + r * cos(angle * PI / 180)
y1 = y0 + r * sin(angle * PI /180)
*/

//初始化表盘
function initDialPlate() {
	let angle = 30;	//1/12角度
	let angle2 = 6; //1/60角度
	let r = 320,r0 = 330,r1 = 345,r2 = 360,r3 = 350;	//半径
	let x0 = 400; y0 = 400;	//圆心坐标
	const PI = 3.14;	//Π
	
	for(let i = 0; i < 12; i++) {
		let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		let _angle = angle * i;
		let _angle2 = angle * (i - 2);
		let x1 = x0 + r1 * Math.cos(_angle * PI / 180 );
		let y1 = y0 + r1 * Math.sin(_angle * PI / 180 );
		line.setAttribute('stroke-width','2');
		if(_angle === 0 || _angle === 90 || _angle === 180 || _angle === 270) {
			x1 = x0 + r0 * Math.cos(_angle * PI / 180 );
			y1 = y0 + r0 * Math.sin(_angle * PI / 180 );
			line.setAttribute('stroke-width','4');
		}
		
		let x2 = x0 + r2 * Math.cos(_angle * PI / 180 );
		let y2 = y0 + r2 * Math.sin(_angle * PI / 180 );
		let x = x0 + r * Math.cos(_angle2 * PI / 180 );
		let y = y0 + r * Math.sin(_angle2 * PI / 180 );
		line.setAttribute('x1', x1);
		line.setAttribute('x2', x2);
		line.setAttribute('y1', y1);
		line.setAttribute('y2', y2);
		line.setAttribute('stroke','#00ff99');
		
		text.setAttribute('x', x);
		text.setAttribute('y', y);
		text.setAttribute('fill', '#f0f0f0');
		text.textContent = i + 1;
		clock.appendChild(line);
		clock.appendChild(text);
	}
	
	for(let i = 0; i < 60; i++) {
		let line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		let _angle3 = angle2 * i;
		let _x1 = x0 + r3 * Math.cos(_angle3 * PI / 180 );
		let _y1 = y0 + r3 * Math.sin(_angle3 * PI / 180 );
		let _x2 = x0 + r2 * Math.cos(_angle3 * PI / 180 );
		let _y2 = y0 + r2 * Math.sin(_angle3 * PI / 180 );
		line2.setAttribute('x1', _x1);
		line2.setAttribute('x2', _x2);
		line2.setAttribute('y1', _y1);
		line2.setAttribute('y2', _y2);
		line2.setAttribute('stroke','#00ff99');
		
		clock.appendChild(line2);
	}
	
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
	// console.log(_H,_Mi,_S);
	let angleS = 6, 
	angleM = 6,
	angleH = 30; 
	clockS.setAttribute('transform', 'rotate('+(angleS * _S)+' 400,400)');
	clockM.setAttribute('transform', 'rotate('+(90 + angleM * (_Mi + _S / 60))+' 400,400)');
	clockH.setAttribute('transform', 'rotate('+(-90 + angleH * (_H + _Mi / 60 + _S / 3600))+' 400,400)');
	
	setInterval(function() {
		let _Date = new Date();
		let _H = _Date.getHours();
		let _Mi = _Date.getMinutes();
		let _S = _Date.getSeconds();
		clockS.setAttribute('transform', 'rotate('+(angleS * _S)+' 400,400)');
		clockM.setAttribute('transform', 'rotate('+(90 + angleM * (_Mi + _S / 60))+' 400,400)');
		clockH.setAttribute('transform', 'rotate('+(-90 + angleH * (_H + _Mi / 60 + _S / 3600))+' 400,400)');
	},1000);
}



