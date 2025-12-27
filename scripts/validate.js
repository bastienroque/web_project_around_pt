const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_active",
};

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-input-error`);
}

function showInputError(formElement, inputElement, message, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  if (!errorElement) return;

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorActiveClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  if (!errorElement) return;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorActiveClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  buttonElement.disabled = hasInvalidInput(inputList);
}

function enableFormValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      if (!inputElement.validity.valid) {
        showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage,
          config
        );
      } else {
        hideInputError(formElement, inputElement, config);
      }

      toggleButtonState(inputList, buttonElement);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    if (hasInvalidInput(inputList)) {
      evt.preventDefault();
      inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
          showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
          );
        }
      });
    }
  });
}

const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((form) => {
  enableFormValidation(form, validationConfig);
});
