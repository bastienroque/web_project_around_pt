export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");

    this._image.src = this._link;
    this._image.alt = this._text;
    this._title.textContent = this._text;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick({
        name: this._text,
        link: this._link
      });
    });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", evt => {
        evt.target.classList.toggle("card__like-button_is-active");
      });
  }
}