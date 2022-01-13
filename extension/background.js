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
  /** @todo send turn on event to the app */
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("onActivated ~ activeInfo", activeInfo)
})

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
  console.log("onAttached ~ attachInfo", attachInfo)
})

chrome.tabs.onCreated.addListener((tab) => {
  console.log("onCreated ~ tab", tab)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log("onUpdated ~ changeInfo", changeInfo)

  /** @todo check the HTTP scheme */
  if (changeInfo.status !== 'complete') {
    return
  }

  chrome.scripting.insertCSS({ target: { tabId }, files: ['tab-app/main.css'] })
  chrome.scripting.executeScript({ target: { tabId }, files: ['tab-app/tab-app.js'] })
})
