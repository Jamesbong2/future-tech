export function initTabs(rootElement, onTabChange) {
  
  if (!rootElement) return () => {}

  const buttonElements = [...rootElement.querySelectorAll('[data-js-tabs-button]')]
  const panelElements = [...rootElement.querySelectorAll('[data-js-tabs-content]')]

  if (!buttonElements.length || !panelElements.length) return () => {}

  const state = {
    activeIndex: buttonElements.findIndex((buttonElement) =>
      buttonElement.classList.contains('is-active')
    )
  }

  if (state.activeIndex === -1) {
    state.activeIndex = 0
  }

  function getButtonIndex(currentButton) {
    return buttonElements.findIndex((buttonElement) => buttonElement === currentButton)
  }

  function getActivePanel() {
    return panelElements[state.activeIndex]
  }

  function updateUi(currentButton) {
    const nextIndex = getButtonIndex(currentButton)

    if (nextIndex === -1) return

    const activeButton = buttonElements[state.activeIndex]
    const activePanel = panelElements[state.activeIndex]
    const nextButton = buttonElements[nextIndex]
    const nextPanel = panelElements[nextIndex]

    if (activePanel) {
      activePanel.classList.remove('is-active')
      activePanel.setAttribute('tabindex', -1)
    }

    if (activeButton) {
      activeButton.classList.remove('is-active')
      activeButton.setAttribute('aria-selected', 'false')
      activeButton.setAttribute('tabindex', -1)
    }

    if (nextButton) {
      nextButton.classList.add('is-active')
      nextButton.setAttribute('aria-selected', 'true')
      nextButton.setAttribute('tabindex', 0)
    }

    if (nextPanel) {
      nextPanel.classList.add('is-active')
      nextPanel.setAttribute('tabindex', 0)
    }

    state.activeIndex = nextIndex
  }

  function handleTabChange(currentButton) {
    if (!currentButton) return

    updateUi(currentButton)

    const category = currentButton.dataset.category
   
    const panel = getActivePanel()

    if (typeof onTabChange === 'function') {
      onTabChange({ category, panel, currentButton, activeIndex: state.activeIndex })
    }
  }

  const currentButton = buttonElements[state.activeIndex]
  if (currentButton) {
    handleTabChange(currentButton)
  }


  const clickHandler = (event) => {
    const currentButton = event.currentTarget
    handleTabChange(currentButton)
  }
  const keydownHandler = (event) => {
    const currentButton = event.currentTarget
    const currentIndex = getButtonIndex(currentButton)

    let nextIndex = currentIndex

    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return
    }

    event.preventDefault()

    if (event.key === 'ArrowRight') {
      nextIndex = currentIndex === buttonElements.length - 1 ? 0 : currentIndex + 1
    }

    if (event.key === 'ArrowLeft') {
      nextIndex = currentIndex === 0 ? buttonElements.length - 1 : currentIndex - 1
    }

    if (event.key === 'Home') {
      nextIndex = 0
    }

    if (event.key === 'End') {
      nextIndex = buttonElements.length - 1
    }

    const nextButton = buttonElements[nextIndex]
    nextButton.focus()
    handleTabChange(nextButton)


  }

 buttonElements.forEach((buttonElement) => {

  buttonElement.addEventListener('click',clickHandler)
  buttonElement.addEventListener('keydown', keydownHandler)

 })

  
  
  function destroy () {
    buttonElements.forEach((buttonElement) => {
      buttonElement.removeEventListener('click',clickHandler)
      buttonElement.removeEventListener('keydown',keydownHandler)

    })
  }
  return destroy
}

