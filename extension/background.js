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

chrome.action.onClicked.addListener(tab => {
  /** @todo remove tab app on next click  */
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['tab-app/tab-app.js'] })
})
