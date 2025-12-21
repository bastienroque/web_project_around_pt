const initialCards = [
    { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

initialCards.forEach(function (card){
    console.log(card.name);
});

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-form");
const popupCloseBtn = document.querySelector(".popup__close");

function openModal (modal) {
    modal.classList.add("popup_is-opened");
};

function closeModal (modal) {
    modal.classList.remove("popup_is-opened");
};

editProfileBtn.addEventListener("click", handleOpenEditModal);

popupCloseBtn.addEventListener("click", () => {
    closeModal(editProfileModal);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = editProfileModal.querySelector(".popup__input_type_name");
const profileDescriptionInput = editProfileModal.querySelector(".popup__input_type_description");

function fillProfileForm() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
};

function handleOpenEditModal() {
    fillProfileForm();
    openModal(editProfileModal);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    closeModal(editProfileModal);
}

editProfileModal.addEventListener("submit", handleProfileFormSubmit);