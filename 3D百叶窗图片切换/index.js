var btns = document.getElementById('btns');
var btn = btns.getElementsByTagName('div');
var list = document.getElementById('list');

var listHtml = '';
for(let i = 0; i < 15; i++) {
	listHtml += '<li style="transition: all 0.8s ease '+(i*50)+'ms; transform: rotateX(-90deg);">'+
					'<a href="javascript:;" style="background-image: url(img/ty001.jpg);background-position: '+(-40*i)+'px 0;"></a>'+
					'<a href="javascript:;" style="background-image: url(img/ty002.jpg);background-position: '+(-40*i)+'px 0;"></a>'+
					'<a href="javascript:;" style="background-image: url(img/ty003.jpg);background-position: '+(-40*i)+'px 0;"></a>'+
					'<a href="javascript:;" style="background-image: url(img/ty004.jpg);background-position: '+(-40*i)+'px 0;"></a>'+
				'</li>';
}
list.innerHTML = listHtml;
var listLi = document.getElementById('list').getElementsByTagName('li');

//按钮组事件监听
btns.addEventListener('click', function(e) {
	// console.log(e);
	let index = parseInt(e.target.innerHTML);
	for(let i = 0; i < 4; i++) {
		btn[i].classList.remove('active');
	}
	
	for(let i = 0; i < 15; i++) {
		listLi[i].style.transform = 'rotateX('+index*(-90)+'deg)';
	}
	btn[index-1].classList.add('active');
});
