class Card {
  constructor(data, cardSelector, imagePopup) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imagePopup = imagePopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._text;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._imagePopup.open(this._link);
      });

    const deleteBtn = this._element.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    const likeBtn = this._element.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-button_is-active");
    });
  }
}

export { Card };
