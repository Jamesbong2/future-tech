import {initHeader} from '../scripts/Header.js'
import {initTabs} from '../scripts/Tabs.js'
import { initVideoPlayer } from './VideoPlayer.js'
import { initSelect } from './Select.js'
initHeader()
initTabs()
initVideoPlayer()
initSelect()
const formElement = document.querySelector('[data-js-feedback-form]')

const formElements = [...formElement.elements]
const errors = {
    
        valueMissing : 'Поле обязательно к заполнению',
        tooShort : 'Поле слишком короткое',
        tooLong : 'Поле слишком длинное',
        patternMismatch: 'Поле не соответствует заданному формату',
        typeMismatch: 'Введите корректное значение',

  
    
    
  


}
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}
function getFieldElements (currentField) { 
    if (!currentField.validity || !currentField.name) return 

    const fieldParent = currentField.closest('[data-js-feedback-form-field]')
    if (!fieldParent) return 

    const errorField = fieldParent.querySelector('[data-js-feedback-form-error]')
    if (!errorField) return 
    return { fieldParent, errorField }

}
function renderFieldValidation({fieldParent, errorField, isValid, message}) {
    console.log(message)
    if (!isValid) {
        errorField.textContent = message
        fieldParent.classList.add('is-invalid')
        return
    }

    errorField.textContent = ''
    fieldParent.classList.remove('is-invalid')
}
function validate(currentField) {
    const fieldElements = getFieldElements(currentField)
    if (!fieldElements) return true

    const { errorField, fieldParent } = fieldElements
    const isValid = currentField.validity.valid
    
    let message = ''
   
  

    if (!isValid) {
       

        for (const key in errors) {
            if (currentField.validity[key]) {
                if (key === 'patternMismatch') {
                    console.log(currentField.title)
                    message = currentField.title || errors[key]
                } else {
                    message = errors[key]
                }
                break
            }
        }
    }

    renderFieldValidation({ fieldParent, errorField, isValid, message })
    return isValid
}
async function mockSendData (data) {
    const buttonElement = document.querySelector('[data-js-feedback-form-button]')
    const successMessageElement = document.querySelector('[data-js-feedback-form-sucess-message]')
    if(successMessageElement.classList.contains('is-active')) successMessageElement.classList.remove('is-active')
    buttonElement.disabled = true
    buttonElement.textContent = 'Sending...'

    try {
        await sleep(1500)
       
        successMessageElement.classList.add('is-active')
        formElement.reset()
        buttonElement.disabled = false
        buttonElement.textContent = 'Sent'


        

    } catch (error) {
        console.log(error)

    }

}

formElement.addEventListener('blur',(event) => {
    const field = event.target

    validate(field)

},true)
formElement.addEventListener('input',(event) => {
    const field = event.target
 
    validate(field)

})


formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    let isFormValid = true

    for (const element of formElement.elements) {
        const valid = validate(element)
        if (!valid) {
            isFormValid = false
        }
    }


    if (!isFormValid) return

    const data = Object.fromEntries(new FormData(formElement))
    data.agreement = formElement.agreement.checked

    const phoneNumberPrefix = data.phoneNumberPrefix
    const phonNumber = data.phonNumber.replace(/\D/g, '')
    data.fullNumber = phoneNumberPrefix + phonNumber

    delete data.phoneNumberPrefix
    delete data.phonNumber

    mockSendData(data)
})