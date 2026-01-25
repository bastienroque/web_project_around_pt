import { api } from "./Api.js";

export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._isLiked = Boolean(data.isLiked);
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    if (this._cardId) {
      this._element.dataset.cardId = this._cardId;
    }

    this._image.src = this._link;
    this._image.alt = this._text;
    this._title.textContent = this._text;

    if (this._isLiked && this._likeButton) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

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

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        if (typeof this._handleDeleteClick === 'function') {
          this._handleDeleteClick(this._element);
        } else {
          this._element.remove();
        }
      });
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", evt => {
        const cardId = this._element.dataset.cardId;
        const target = evt.target;

        if (cardId) {
          // call API to like/unlike depending on current state
          const willUnlike = target.classList.contains("card__like-button_is-active");
          const apiCall = willUnlike ? api.unlikeCard(cardId) : api.likeCard(cardId);
          apiCall
            .then((updatedCard) => {
              if (updatedCard && updatedCard.isLiked) {
                target.classList.add("card__like-button_is-active");
              } else {
                target.classList.remove("card__like-button_is-active");
              }
            })
            .catch((err) => {
              console.error("Failed to update like:", err);
            });
        } else {
          // fallback for local-only cards
          target.classList.toggle("card__like-button_is-active");
        }
      });
    }
  }

  _handleDeleteClick() {
  confirmationPopup.setSubmitAction(() => {
    this._handleDeleteCard(this._cardId);
    confirmationPopup.close();
  });
  }
}