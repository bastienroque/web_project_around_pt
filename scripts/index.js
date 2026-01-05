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
