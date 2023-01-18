const denglong = [['deng-box', '春节'], ['deng-box1', '快乐']]
const hangingDrop = document.querySelector('.hanging-drop')
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
if(window.location.pathname === "/"){
  denglong.forEach((item) => {
    createDeng(...item)
  })
}



