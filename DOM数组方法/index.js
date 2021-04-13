//获取节点
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaries');
const sortBtn = document.getElementById('sort');
const calculateWeathBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
//异步函数
async function getRandomUser() {
	//await等待
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();
	
	const user = data.results[0];
	const newUser = {
		name: `${ user.name.first } ${ user.name.last }`,
		money: Math.floor(Math.random() * 1000000 )
	};
	
	addData(newUser);
}

//资金翻倍
function doubleMoney() {
	//map遍历 返回新数组
	data = data.map(user => {
		return { 
			...user, 
			money: user.money * 2 ,
		};
	});
	updateDOM();
}

//财富榜排序
function sortByRichest() {
	/*sort() 用原地算法对数组元素进行排序，并返回数组。默认排列顺序是将、
	元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的 */
	data.sort( (a, b) => b.money - a.money );
	updateDOM();
}

//查询百万富翁
function showMillionaires() {
	//filter过滤符合某个条件的元素
	data = data.filter(user => user.money > 1000000);
	updateDOM();
}

//计算总金额
function calculateWeath() {
	/*reducer()
	参数: acc 累计器 cur 当前值 idx当前索引 src源数组
	返回值: 累计处理结果
	*/
   const wealth = data.reduce((acc, user) => (acc += user.money), 0);
   
   const wealthEl = document.createElement('div');
   wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong> </h3>`;
   main.appendChild(wealthEl);
}


//添加随机生成对象
function addData(obj) {
	data.push(obj);
	updateDOM();
}

//更新dom
function updateDOM(provideData = data) { //默认传data
	//清除main内容 
	main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
	
	//forEach遍历
	provideData.forEach((item, index, arr) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${ item.name }</strong>${ formatMoney(item.money) }`;
		main.appendChild(element);
	});
}

//货币格式转换
function formatMoney(number) {
	return '$'+ (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&，');
}

//事件监听
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWeathBtn.addEventListener('click', calculateWeath);