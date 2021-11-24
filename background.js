const color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
})

chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, function: setPageBackgroundColor })
})

function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
}