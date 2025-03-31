const denglong = [['deng-box', '春节'], ['deng-box1', '快乐']]
const hangingDrop = document.querySelector('.hanging-drop')
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
const formattedMonth = String(month).padStart(2, '0');
const formattedDay = String(day).padStart(2, '0');
const formattedDate = `${formattedMonth}-${formattedDay}`;
const regex = /初[一-八]/;

function createDeng(dengName, title) {
  const dengBox = document.createElement('div')
  dengBox.className = dengName
  dengBox.innerHTML = `<div class="deng">
    <div class="xian"></div>
    <div class="deng-a">
      <div class="deng-b">
        <div class="deng-t">${title}</div>
      </div>
    </div>
    <div class="shui shui-a">
      <div class="shui-c"></div>
      <div class="shui-b"></div>
    </div>
    </div>`
  hangingDrop.appendChild(dengBox)
}

fetch(`https://timor.tech/api/holiday/year/${year}`)
.then((response) => response.json())
.then(({holiday}) => {
  if(holiday && holiday[formattedDate] && regex.test(holiday[formattedDate].name)){
    if(window.location.pathname === "/"){
      denglong.forEach((item) => {
        createDeng(...item);
      });
    }
  }
})
.catch(console.error);




