const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const popupImage = document.querySelector("#image-popup");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupCloseButton = popupImage.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const newCardPopup = document.querySelector("#new-card-popup");

const imagePopup = {
  popup: document.querySelector("#image-popup"),
  image: document.querySelector("#image-popup .popup__image"),
  closeButton: document.querySelector("#image-popup .popup__close"),

  open(link) {
    this.image.src = link;
    this.popup.classList.add("popup_is-opened");
  },

  close() {
    this.image.src = "";
    this.popup.classList.remove("popup_is-opened");
  },
};

imagePopup.closeButton.addEventListener("click", () => imagePopup.close());

class Card {
  constructor(data, cardSelector, imagePopup) {
    this._text = data.text;
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

initialCards.forEach((data) => {
  createAndPrependCard(data);
});

function createAndPrependCard({ text, link }) {
  const card = new Card({ text, link }, "#card-element", imagePopup);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const cardName = event.target.querySelector(".popup__input_type_card-name");
  const cardLink = event.target.querySelector(".popup__input_type_url");

  createAndPrependCard({
    text: cardName.value,
    link: cardLink.value,
  });

  closeModal(newCardPopup);
  event.target.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);
