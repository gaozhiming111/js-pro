var btns = document.getElementById('btns');
var btn = btns.getElementsByTagName('div');
var list = document.getElementById('list').getElementsByTagName('li')[0];

btns.addEventListener('click', function(e) {
	for(let i = 0; i < 4; i++) {
		btn[i].classList.remove('active');
	}
	// console.log(e);
	list.style.transform = 'rotateX('+parseInt(e.target.innerHTML)*(-90)+'deg)';
	btn[parseInt(e.target.innerHTML)-1].classList.add('active');
});
