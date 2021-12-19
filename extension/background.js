const color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })

  chrome.action.disable()

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    const rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { schemes: ['https'] }
        })
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    }

    chrome.declarativeContent.onPageChanged.addRules([rule])
  })
})

const tabRecord = {}

function getCssInject(tab) {
  return { target: { tabId: tab.id }, files: ['tab-app/main.css'] }
}

function addTabApp(tab) {
  chrome.scripting.insertCSS(getCssInject(tab))
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['tab-app/tab-app.js'] })
}

function removeTabApp(tab) {
  chrome.scripting.removeCSS(getCssInject(tab))

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.getElementById('commently').remove()
  })
}

chrome.action.onClicked.addListener(tab => {
  if (tabRecord[tab.id]) {
    removeTabApp(tab)
    tabRecord[tab.id] = false
  } else {
    addTabApp(tab)
    tabRecord[tab.id] = true
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tabRecord[tabId]) {
    addTabApp(tab)
  }
})
