export function initHeader () {
    const headerElement = document.querySelector('[data-js-header]');
    if(!headerElement) return 
    
    const headerOverlayElement = headerElement.querySelector('[data-js-header-overlay]')
    if(!headerOverlayElement) return 
    const burgerButtonElement = headerElement.querySelector('[data-js-header-burger-button]')
    if(!burgerButtonElement ) return 
    burgerButtonElement.addEventListener('click',() => {
       
       
       const isOpen =  burgerButtonElement.classList.toggle('is-active')
        if(isOpen) {
            headerOverlayElement.classList.add('is-active')
            document.documentElement.classList.add('is-lock')
        } else {
            headerOverlayElement.classList.remove('is-active')
            document.documentElement.classList.remove('is-lock')
        
        }
        
      
        
    })
    }