import { Popup } from "./src/components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const values = {};

    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();

      const originalText = this._submitButton ? this._submitButton.textContent : '';
      if (this._submitButton) this._submitButton.textContent = 'Salvando...';

      const result = this._handleFormSubmit(this._getInputValues());

      if (result && typeof result.then === 'function') {
        result
          .then(() => {
            this.close();
          })
          .catch((err) => {
              console.error('Form submit failed:', err);
              // keep form open on error, but still restore button text
            })
          .finally(() => {
            if (this._submitButton) this._submitButton.textContent = originalText;
          });
      } else {
        // synchronous handler
        this.close();
        if (this._submitButton) this._submitButton.textContent = originalText;
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}