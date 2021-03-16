const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

//更新座位数及总票价
function updateSelectCount() {
	//已选座位
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	
	//...展开运算符 --> 复制数组 ，map()方法返回新数组
	// const seatsIndex = [...selectedSeats].map(function(seat) {
	// 	return [...seats].indexOf(seat);
	// });
	const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));	
	
	//localStorage本地存储 
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
	
	//座位数
	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	//总票价
	total.innerText = selectedSeatsCount * ticketPrice;
}

//影片选择下拉事件监听
movieSelect.addEventListener('change',e => {
	ticketPrice = +e.target.value;
	
	//保存影片索引和值
	setMovieData(e.target.selectedIndex, e.target.value);
	//更新数据
	updateSelectCount();
});

//保存影片索引和值
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

//获取localStorage数据并渲染
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	// console.log(selectedSeats);
	if(selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}
	
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if(selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}


//事件代理 事件冒泡 提升性能
//座位点击事件
container.addEventListener('click',e => {
	// console.log(e.target);
	//判断是否包含 seat 类名，并且不包含 occupied 类名
	if(e.target.classList.contains('seat') &&
	 !e.target.classList.contains('occupied')) {
		//座位选中 / 取消选中
		e.target.classList.toggle('selected');
		
		//座位数，总票价更新
		updateSelectCount();
	}
});

//设置初始数据（座位，总票价）
updateSelectCount();