
const buttonElements = [...document.querySelectorAll('[data-js-tabs-button]')]
const panelElements = [...document.querySelectorAll('[data-js-tabs-content]')]

const state = {
  activeIndex: buttonElements.findIndex(buttonElement =>
    buttonElement.classList.contains('is-active')
  )
}

if (state.activeIndex === -1) {
  state.activeIndex = 0
}


function updateUi(currentButton) {
    const nextIndex = buttonElements.findIndex(
      buttonElement => buttonElement === currentButton
    )
  
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



export function initTabs () {
    


buttonElements.forEach(element => {
  element.addEventListener('click', event => {
    updateUi(event.currentTarget)
  })
})
buttonElements.forEach((element) => {
    element.addEventListener('keydown',(event) =>{
        const currentButton = event.currentTarget
        const currentIndex = buttonElements.findIndex(buttonElement => buttonElement === currentButton)
        let nextIndex = currentIndex
        if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'End' || event.key === 'Home') {
            event.preventDefault()
            if(event.key === 'ArrowRight') {
                if(currentIndex === buttonElements.length-1) {
                    nextIndex = 0
                } else {
                    nextIndex = currentIndex+1
                }
            }
            if(event.key === 'ArrowLeft') {
                if(currentIndex === 0) {
                    nextIndex = buttonElements.length-1
                } else {
                    nextIndex = currentIndex-1
                }
            }
            if(event.key === 'Home') nextIndex = 0
            if(event.key === 'End') nextIndex = buttonElements.length-1
            const nextButton = buttonElements[nextIndex]
            nextButton.focus()

            updateUi(nextButton)

            
        }
    })

})
}