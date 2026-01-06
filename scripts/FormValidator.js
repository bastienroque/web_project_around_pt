class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputs = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitButton = form.querySelector(config.submitButtonSelector);
  }

  // Private method: get the error element for an input
  _getErrorElement(input) {
    return this._form.querySelector(`.${input.id}-input-error`);
  }

  // Private method: show or hide an input error
  _setInputError(input, message = "") {
    const errorElement = this._getErrorElement(input);
    if (!errorElement) return;

    input.classList.toggle(this._config.inputErrorClass, !!message);
    errorElement.textContent = message;
    errorElement.classList.toggle(this._config.errorActiveClass, !!message);
  }

  // Private method: check if any input is invalid
  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  // Private method: toggle the submit button state
  _toggleButtonState() {
    this._submitButton.disabled = this._hasInvalidInput();
  }

  // Private method: validate a single input
  _validateInput(input) {
    this._setInputError(input, input.validationMessage);
  }

  // Private method: set up event listeners
  _setEventListeners() {
    // Initial button state
    this._toggleButtonState();

    // Input listeners
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._toggleButtonState();
      });
    });

    // Form submit listener
    this._form.addEventListener("submit", (evt) => {
      if (this._hasInvalidInput()) {
        evt.preventDefault();
        this._inputs.forEach((input) => {
          if (!input.validity.valid) this._validateInput(input);
        });
      }
    });
  }

  // Public method: enable validation
  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
