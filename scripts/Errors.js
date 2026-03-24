export function ErrorState({ title, message, buttonText, onAction }) {
    const errorWrapper = document.createElement("div");
    errorWrapper.className = "error-state container";
  
    errorWrapper.innerHTML = `
      <div class="error-state__content">
        <h4 class="error-state__title">${title}</h4>
        <p class="error-state__message">${message}</p>
        <button class="error-state__button button button--error" data-js-error-state>
          ${buttonText}
        </button>
      </div>
    `;
    const buttonElement = errorWrapper.querySelector("[data-js-error-state]");
  
    if (onAction && buttonElement) {
      buttonElement.addEventListener("click", onAction);
    }
  
    return errorWrapper;
  }
  