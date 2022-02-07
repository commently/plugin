chrome.runtime.onInstalled.addListener(() => {
  chrome.browserAction.disable()

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

chrome.browserAction.onClicked.addListener(tab => {
  const tabId = tab.id

  if (!tabId) {
    console.warn('tab ID is undefined during the toggle');
    return
  }

  chrome.tabs.sendMessage(tabId, { type: 'toggle' })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') {
    return
  }

  chrome.tabs.get(tabId, ({ url }) => {
    if (!url || !url.startsWith('https')) {
      return
    }

    chrome.tabs.insertCSS({ file: 'tab-app/main.css' })
    chrome.tabs.executeScript({ file: 'tab-app/tab-app.js' })
  })
})

chrome.runtime.onMessage.addListener(({ type, payload }, { tab }) => {
  if (type === 'status') {
    const tabId = tab?.id

    if (payload.isOn) {
      chrome.browserAction.setBadgeBackgroundColor({ tabId, color: '#22C55E' })
      chrome.browserAction.setBadgeText({ tabId, text: 'On' })
    } else {
      chrome.browserAction.setBadgeBackgroundColor({ tabId, color: '#EF4444' })
      chrome.browserAction.setBadgeText({ tabId, text: 'Off' })
    }
  }

  return true
});
