const changeColorElement = document.getElementById('changeColor')

chrome.storage.sync.get('color', ({ color }) => {
  changeColorElement.style.backgroundColor = color
})