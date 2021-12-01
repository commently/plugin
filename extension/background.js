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
  // chrome.scripting.executeScript({ target: { tabId: tab.id }, function: subscribeToPageClicks })
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['tab-app/tab-app.js'] })
})

// function subscribeToPageClicks() {
//   /** @todo click fullscreen overlay because stop propagation does not work */
  
//   /** @todo unsubscribe because every action click adds new subscription */
//   document.body.addEventListener('click', clickListener)

//   function clickListener({ x, y }) {
//     /** @todo use React to simplify management of the DOM */
//     const button = document.createElement('button')
    
//     /** @todo add the serial number of conversation for the user to distinguish them */

//     /** @todo insert CSS file in the page to simplify CSS description */
//     button.style.position = 'absolute'
//     button.style.left = `${x}px`
//     button.style.top = `${y}px`
//     button.style.width = '20px'
//     button.style.height = '20px'
//     button.style.borderRadius = '10px'
//     button.style.borderBottomLeftRadius = '0px'
//     button.style.backgroundColor = 'green'
//     button.style.transform = 'translateY(-20px)'
//     button.style.zIndex = '1'
//     button.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)'
    
//     button.addEventListener('click', handleButtonClick)

//     /** @todo add button to container to destroy all buttons easily */
//     document.body.appendChild(button)
//   }

//   function handleButtonClick() {
//     console.log('conversation clicked');
//   }
// }