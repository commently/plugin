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
  if (changeInfo.status !== 'complete') {
    return
  }

  chrome.tabs.get(tabId, ({ url }) => {
    if (!url || !url.startsWith('https')) {
      return
    }

    chrome.scripting.insertCSS({ target: { tabId }, files: ['tab-app/main.css'] })
    chrome.scripting.executeScript({ target: { tabId }, files: ['tab-app/tab-app.js'] })
  })
})

chrome.runtime.onMessage.addListener(({ type, payload }, { tab }) => {
  if (type === 'status') {
    const tabId = tab.id

    if (payload.isOn) {
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#22C55E' })
      chrome.action.setBadgeText({ tabId, text: 'On' })
    } else {
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#EF4444' })
      chrome.action.setBadgeText({ tabId, text: 'Off' })
    }
  }

  return true
});
