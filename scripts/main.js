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
    firstName : {
        valueMissing : 'Имя обязательно к заполнению',
        tooShort : 'Имя слишком короткое',
        tooLong : 'Имя слишком длинное'

    },
    lastName : {
        valueMissing : 'Фамилия обязательна к заполнению',
        tooShort : 'Фамилия слишком короткая',
        tooLong : 'Фамилия слишком длинная'
    },
    email : {
        valueMissing : 'Email обязательно к заполнению',
        typeMismatch: 'Введите  корректный email',

    },
    message : {
        valueMissing : 'Сообщение обязательно к заполнению',
        tooShort : 'Сообщение слишком короткое',
        tooLong : 'Сообщение  слишком длинное'
    },
    phonNumber : {
        patternMismatch : 'Поле не соответствует патерну',
        valueMissing : 'Номер телефона  обязателен  к заполнению',
    }


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
        const fieldErrors = errors[currentField.name]

        for (const key in fieldErrors) {
            if (currentField.validity[key]) {
                if (key === 'patternMismatch') {
                    message = currentField.title || fieldErrors[key]
                } else {
                    message = fieldErrors[key]
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

formElements.forEach((element) => {
   element.addEventListener('blur', (event) => {
        const currentField = event.currentTarget
        console.log(currentField.validity)
       
        validate(currentField)
      
      


    })
    element.addEventListener('input',(event) => {
        const currentField = event.currentTarget
        
        const fieldElements = getFieldElements(currentField)
        if (!fieldElements) return
        
        const { fieldParent  } = fieldElements
        
        
        if (fieldParent.classList.contains('is-invalid')) {
          validate(currentField)
        }

    })

   

})

formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    let isFormValid = true

    formElements.forEach((element) => {
        const valid = validate(element)
        if (!valid) {
            isFormValid = false
        }
    })

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