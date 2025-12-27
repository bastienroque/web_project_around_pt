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
const popupCloseBtns = document.querySelectorAll(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = editProfileModal.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);

const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const cardsList = document.querySelector(".cards__list");
const newCardForm = document.querySelector("#new-card-form");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorActiveClass: "popup__input-error_active",
};

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editProfileBtn.addEventListener("click", handleOpenEditModal);

popupCloseBtns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  });
});

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(editProfileModal);
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);

addCardBtn.addEventListener("click", handleOpenEditCard);

function handleOpenEditCard() {
  openModal(addCardModal);
}

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg"
) {
  const cardTemplate = document
    .querySelector("#card-element")
    .content.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");

  const cardName = cardElement.querySelector(".card__title");
  cardName.textContent = name;
  const cardLink = cardElement.querySelector(".card__image");
  cardLink.src = link;
  cardLink.alt = name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  const imagePopup = document.querySelector("#image-popup");
  const imageDescription = imagePopup.querySelector(".popup__image");
  const imageCaption = imagePopup.querySelector(".popup__caption");
  cardLink.addEventListener("click", function () {
    imagePopup.classList.add("popup_is-opened");
    imageDescription.src = link;
    imageDescription.alt = name;
    imageCaption.textContent = name;
  });

  return cardElement;
}

function renderCard(name, link, cardsList) {
  const card = getCardElement(name, link);
  cardsList.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  const cardName = document.querySelector(".popup__input_type_card-name");
  const cardLink = document.querySelector(".popup__input_type_url");
  renderCard(cardName.value, cardLink.value, cardsList);
  closeModal(addCardModal);
  event.target.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// forms validation

function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-input-error`);
}

function showInputError(formElement, inputElement, message, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  if (!errorElement) return;

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(config.errorActiveClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  if (!errorElement) return;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorActiveClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  buttonElement.disabled = hasInvalidInput(inputList);
}

function enableFormValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      if (!inputElement.validity.valid) {
        showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage,
          config
        );
      } else {
        hideInputError(formElement, inputElement, config);
      }

      toggleButtonState(inputList, buttonElement);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    if (hasInvalidInput(inputList)) {
      evt.preventDefault();
      inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
          showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
          );
        }
      });
    }
  });
}

const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((form) => {
  enableFormValidation(form, validationConfig);
});

// para fechar popups

function closePopupOnOverlayClick(popup) {
  popup.addEventListener("mousedown", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
}

const popups = document.querySelectorAll(".popup");

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
