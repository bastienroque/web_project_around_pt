import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

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

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = editProfileModal.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);

const popups = document.querySelectorAll(".popup");

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editProfileModal);
}
editProfileBtn.addEventListener("click", handleOpenEditModal);
editProfileModal.addEventListener("submit", handleProfileFormSubmit);

function closePopupOnOverlayClick(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
}

popups.forEach((popup) => {
  closePopupOnOverlayClick(popup);
});

function closePopupOnEsc() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  });
}

closePopupOnEsc();

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

initialCards.forEach((data) => {
  createAndPrependCard(data);
});

function createAndPrependCard({ name, link }) {
  const card = new Card({ name, link }, "#card-element", imagePopup);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const cardName = event.target.querySelector(".popup__input_type_card-name");
  const cardLink = event.target.querySelector(".popup__input_type_url");

  createAndPrependCard({
    name: cardName.value,
    link: cardLink.value,
  });

  closeModal(newCardPopup);
  event.target.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_active",
};

document.querySelectorAll(validationConfig.formSelector).forEach((form) => {
  const validator = new FormValidator(form, validationConfig);
  validator.enableValidation();
});
