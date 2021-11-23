const changeColorElement = document.getElementById('changeColor')

chrome.storage.sync.get('color', ({ color }) => {
  changeColorElement.style.backgroundColor = color
})

changeColorElement.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({ target: { tabId: tab.id }, function: setPageBackgroundColor })
})

function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
}