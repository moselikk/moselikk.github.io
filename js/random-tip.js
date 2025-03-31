/**
 * 三字Tip
 */

const sidebarTipArr = [
	'要坚强','不放弃','不服输','永奋斗','誓不休','你超棒','不旋踵','往前冲',
	'和气道','傲霜枝','试金石','敢拼搏','发现美','诗言志','跑起来','爱自己',
];

function getNoRepeatNum(minNum, maxNum) {
	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	let num = window.localStorage.getItem('moNum');
	if (!num) {
		num = getRandomNum(minNum, maxNum);
		window.localStorage.setItem('moTime', Date.now());
		window.localStorage.setItem('moNum', num);
		return num;
	} else {
		const oldTime = window.localStorage.getItem('moTime');
		if (oldTime) {
			const nowTime = Date.now();
			// 十分钟内Tip内容不随机
			if (nowTime - oldTime < 6e4) return num;
		}
		let randomNum = getRandomNum(minNum, maxNum);
		while (randomNum === num) {
			randomNum = getRandomNum(minNum, maxNum);
		}
		window.localStorage.setItem('moNum', randomNum);
		window.localStorage.setItem('moTime', Date.now());

		return randomNum;
	}
}

const sidebarTipArrNum = getNoRepeatNum(0, sidebarTipArr.length - 1);
let tipNow = sidebarTipArr[sidebarTipArrNum];
const sidebarTittle = document.querySelector('.tip-enum');


sidebarTittle.innerHTML = `<span>${tipNow}</span>`;