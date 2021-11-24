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
  chrome.scripting.executeScript({ target: { tabId: tab.id }, function: subscribeToPageClicks })
})

function subscribeToPageClicks() {
  /** @todo click fullscreen overlay because stop propagation does not work */
  
  /** @todo unsubscribe because every action click adds new subscription */
  document.body.addEventListener('click', clickListener)

  function clickListener({ x, y }) {
    console.log(`x: ${x}, y: ${y}`);
  }
}