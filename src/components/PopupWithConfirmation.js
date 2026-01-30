import { Popup } from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(
      ".popup__button_type_confirm"
    );
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}