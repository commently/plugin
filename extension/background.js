chrome.runtime.onInstalled.addListener(() => {
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

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, { type: 'toggle' })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  /** @todo check the HTTP scheme */
  if (changeInfo.status !== 'complete') {
    return
  }

  chrome.scripting.insertCSS({ target: { tabId }, files: ['tab-app/main.css'] })
  chrome.scripting.executeScript({ target: { tabId }, files: ['tab-app/tab-app.js'] })
})
