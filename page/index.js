import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

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
const addCardBtn = document.querySelector(".profile__add-button");

const profileTitleInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-element",
        (cardData) => {
          imagePopup.open(cardData);
        }
      );

      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list"
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
  }
);

editProfilePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  profileTitleInput.value = name;
  profileDescriptionInput.value = job;

  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm(
  "#new-card-popup",
  (formData) => {
    const card = new Card(
      {
        name: formData["place-name"],
        link: formData.link,
      },
      "#card-element",
      (cardData) => {
        imagePopup.open(cardData);
      }
    );

    cardSection.addItem(card.generateCard());
  }
);

addCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_active",
};

document
  .querySelectorAll(validationConfig.formSelector)
  .forEach((formElement) => {
    const validator = new FormValidator(formElement, validationConfig);
    validator.enableValidation();
  });
