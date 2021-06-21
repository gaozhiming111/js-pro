//获取节点
const toggle = document.getElementById("toggle");
const close = document.getElementById('close');
const open = document.getElementById('open');
const model = document.getElementById('model');

//Toogle nav 
toggle.addEventListener("click", () => {
	document.body.classList.toggle("show-nav");
});

//show model
open.addEventListener('click', () => {
	model.classList.add("show-model");
});

//hide model 
close.addEventListener("click", () => {
	model.classList.remove('show-model');
});

//Hide modal on outside onclick
window.addEventListener('click', e => {
	e.target == model ? model.classList.remove("show-model") : false
})