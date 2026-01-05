const editProfileBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");

    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_is-opened");
  }

  close() {
    this._popupElement.classList.remove("popup_is-opened");
  }

  _handleClose() {
    this.close();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this._handleClose);
  }
}

const addCardPopup = new Popup("#new-card-popup");
addCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

const editProfilePopup = new Popup("#edit-popup");
editProfilePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
  editProfilePopup.open();
});
