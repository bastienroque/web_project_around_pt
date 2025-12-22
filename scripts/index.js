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
  cardsList.append(card);
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
