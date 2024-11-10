import './pages/index.css'; 
import {initialCards} from './scripts/components/cards'
import { createCard, handleLikeToggle, handleDeleteCard} from './scripts/components/card';
import { openModal, closeModal} from './scripts/components/modal';
import { enableValidation, clearValidation } from './scripts/components/validation';
import * as API from './scripts/components/api';

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

//данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');
const formEdit = popupEdit.querySelector('form');
const formNewCard = popupNewCard.querySelector('form');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('form');

// кнопки
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileAddButtonOpen = document.querySelector('.profile__add-button');
const profileEditButtonClose = popupEdit.querySelector('.popup__close');
const profileAddButtonClose = popupNewCard.querySelector('.popup__close');
const popupImageButtonClose = popupImage.querySelector('.popup__close');
const popupAvatarClose = popupAvatar.querySelector('.popup__close');

const cardContainer = document.querySelector('.places__list');

let userId;

function renderLoading(isLoading, popup) {
    const submitButton = popup.querySelector(".popup__button");
    submitButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

function displayPageInfo() {
    Promise.all([API.getUserInfo(), API.getAllCards()]).then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`
        userId = userData['_id'];
        cardsData.forEach((item)=>{
            cardContainer.append(createCard(item, userId, handleImageClick, handleLikeToggle, handleDeleteCard, API.deleteCard, API.addLikeCard, API.deleteLikeCard));
        })
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// Обработчик «отправки» формы, 
function handleFormProfileEdit(evt) {
    evt.preventDefault(); 
    renderLoading(true, popupEdit);
    API.editUserInfo(formEdit.name.value, formEdit.description.value ).then((data)=>{
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        renderLoading(false, popupEdit);
    }); 

    closeModal(popupEdit);
}

//Обработчик создания новой карточки
function handleFormNewCard(evt){
    evt.preventDefault();
    renderLoading(true, popupNewCard);
    const newCardInfo = {name: formNewCard['place-name'].value, link: formNewCard.link.value}; 
    API.addNewCard(newCardInfo).then((data)=> {
        const newCard =createCard(data, userId, handleImageClick, handleLikeToggle, handleDeleteCard, API.deleteCard, API.addLikeCard, API.deleteLikeCard);
        addNewCard(newCard);
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        renderLoading(false, popupNewCard);
    }); 
    formNewCard['place-name'].value = '';
    formNewCard.link.value = '';
    closeModal(popupNewCard);
    clearValidation(formNewCard, settings);
}

function addNewCard(card){
    cardContainer.prepend(card);
}
  
function handleImageClick(evt){
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.parentElement.querySelector(".card__title").textContent;
    openModal(popupImage);
}

function handleFormAvatar(evt) {
    evt.preventDefault();
    renderLoading(true, popupAvatar);
    API.editUserImage(formAvatar.avatar.value).then((data)=>{
        profileImage.style.backgroundImage = `url(${data.avatar})`
        closeModal(popupAvatar);
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }).finally(() => {
        renderLoading(false, popupAvatar);
    }); 
}
  
displayPageInfo();

//добавление слушателей открытия и закрытия окон
profileEditButtonOpen.addEventListener('click', function(){
    formEdit.name.value = profileTitle.textContent;
    formEdit.description.value = profileDescription.textContent;
    clearValidation(formEdit, settings);
    openModal(popupEdit);
});
profileAddButtonOpen.addEventListener('click', function(){
    openModal(popupNewCard);
});
profileEditButtonClose.addEventListener('click', function(){
    closeModal(popupEdit);
});
profileAddButtonClose.addEventListener('click', function(){
    closeModal(popupNewCard);
});
popupImageButtonClose.addEventListener('click', function(){
    closeModal(popupImage);
});

profileImage.addEventListener('click', function(){
    openModal(popupAvatar);
});

popupAvatarClose.addEventListener('click', function(){
    closeModal(popupAvatar);
});

//обработка форм
formEdit.addEventListener('submit', handleFormProfileEdit);
formNewCard.addEventListener('submit', handleFormNewCard);
formAvatar.addEventListener('submit', handleFormAvatar);

enableValidation(settings);




