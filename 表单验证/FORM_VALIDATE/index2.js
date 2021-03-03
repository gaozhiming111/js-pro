// get Element
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = "form-control error";
	small.innerText = message;
	
}

//show success
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

//checkRequired input
function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if(input.value.trim() === "") {
			showError(input, `${ getKeyWords(input) }为必填项`);
		} else {
			showSuccess(input);
		}
	});
}

//get keyWords
function getKeyWords(input) {
	return input.placeholder.slice(3);
}
//check email is valid
function checkEmail(input) {
	const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if(re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, "邮箱格式不正确");
	}
}

//check length
function checkLength(input,min,max) {
	if(input.value.length < min) {
		showError(input, `${ getKeyWords(input) }至少${min}个字符`);
	} else if(input.value.length > max) {
		showError(input, `${ getKeyWords(input) }最多${max}个字符`);
	} else {
		showSuccess(input);
	}
}

//password match
function checkPasswordMatch(input1,input2) {
	if(input1.value !== input2.value) {
		showError(input2, "两次输入密码不一致");
	}
}
//event listener
form.addEventListener('submit', function(e) {
	e.preventDefault();
	
	//表单判断
	checkRequired([username,email,password,password2]);
	//长度判断
	checkLength(username,3,15);
	checkLength(password,6,12);
	//邮箱格式验证
	checkEmail(email);
	//密码验证
	checkPasswordMatch(password,password2);
});