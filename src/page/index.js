import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { api } from "../components/Api.js";

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

const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");
confirmationPopup.setEventListeners();

const profileImage = document.querySelector('.profile__image');
const avatarButton = document.querySelector('.profile__avatar-button');

const avatarPopup = new PopupWithForm('#avatar-popup', (formData) => {
  const url = formData.avatar;
  api.updateAvatar({ avatar: url })
    .then((updatedUser) => {
      if (updatedUser && updatedUser.avatar) {
        profileImage.src = updatedUser.avatar;
      } else {
        profileImage.src = url;
      }
    })
    .catch((err) => console.error('Failed to update avatar:', err));
});

avatarPopup.setEventListeners();

if (avatarButton) {
  avatarButton.addEventListener('click', () => {
    avatarPopup.open();
  });
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-element",
        (cardData) => imagePopup.open(cardData),
        (cardElement) => {
          confirmationPopup.setSubmitAction(() => {
            api.deleteCard(item._id)
              .then(() => {
                cardElement.remove();
                confirmationPopup.close();
              })
              .catch(console.error);
          });
          confirmationPopup.open();
        }
      );

      return card.generateCard();
    },
  },
  ".cards__list"
);

// Load user info and initial cards, then render cards (fall back to defaults on error)
api
  .getAppInfo()
  .then(([userData, cards]) => {
    // set user info and avatar
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    if (userData.avatar) profileImage.src = userData.avatar;

    // populate section and render server cards
    cardSection._items = cards;
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error('Failed to load initial data, falling back to defaults:', err);
    // fallback to local initial cards so the UI remains usable
    cardSection._items = initialCards;
    cardSection.renderItems();
  });

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (formData) => {
    // return the promise so PopupWithForm shows loading state until complete
    return api
      .updateUser({ name: formData.name, about: formData.description })
      .then((updatedUser) => {
        userInfo.setUserInfo({ name: updatedUser.name, job: updatedUser.about });
      })
      .catch((err) => {
        console.error('Failed to update user:', err);
        // rethrow so caller can handle if needed
        throw err;
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
    return api.addCard({
      name: formData["place-name"],
      link: formData.link,
      id: formData.id,
    }).then((cardData) => {
      const card = new Card(
        cardData,
        "#card-element",
        (data) => {
          imagePopup.open(data);
        }
      );

      cardSection.addItem(card.generateCard());
    });
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

// confirmationPopup is initialized above so cards can use it when created