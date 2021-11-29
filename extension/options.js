const page = document.getElementById('buttonDiv')
const selectedClassName = 'current'
const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']

constructOptions(presetButtonColors)

function constructOptions(buttonColors) {
  chrome.storage.sync.get('color', ({ color }) => {
    for (const buttonColor of buttonColors) {
      /** @todo use React to handle state effectively */
      const button = document.createElement('button')
      button.dataset.color = buttonColor
      button.style.backgroundColor = buttonColor

      if (buttonColor === color) {
        button.classList.add(selectedClassName)
      }

      button.addEventListener('click', handleButtonClick)
      page.appendChild(button)
    }
  })
}

function handleButtonClick(event) {
  let current = event.target.parentElement.querySelector(`.${selectedClassName}`)

  if (current && current !== event.target) {
    current.classList.remove(selectedClassName)
  }

  const { color } = event.target.dataset
  event.target.classList.add(selectedClassName)
  chrome.storage.sync.set({ color })
}