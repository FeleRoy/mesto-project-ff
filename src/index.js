import './pages/index.css'; 
import {initialCards} from './scripts/components/cards'
import { createCard, deleteCard, likeCard} from './scripts/components/card';
import { openModal, closeModal} from './scripts/components/modal';
import { enableValidation, clearValidation, settings } from './scripts/components/validation';
import * as API from './scripts/components/api';

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

// кнопки
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileAddButtonOpen = document.querySelector('.profile__add-button');
const profileEditButtonClose = popupEdit.querySelector('.popup__close');
const profileAddButtonClose = popupNewCard.querySelector('.popup__close');
const popupImageButtonClose = popupImage.querySelector('.popup__close');

const cardContainer = document.querySelector('.places__list');

function displayPageInfo() {
    Promise.all([API.getUserInfo(), API.getAllCards()]).then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`
        const userId = userData['_id'];

        console.log(cardsData);
        cardsData.forEach((item)=>{
            cardContainer.append(createCard({name: item.name, link: item.link, likes: item.likes.length, cardOwnerID: item.owner['_id'], cardID: item._id}, API, likeCard, handleImageClick, userId));
        })
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 
}

// Обработчик «отправки» формы, 
function handleFormProfileEdit(evt) {
    evt.preventDefault(); 
    API.editUserInfo(formEdit.name.value, formEdit.description.value ).then((data)=>{
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 

    closeModal(popupEdit);
}

//Обработчик создания новой карточки
function handleFormNewCard(evt){
    evt.preventDefault();
    const newCardInfo = {name: formNewCard['place-name'].value, link: formNewCard.link.value};
    const newCard = createCard(newCardInfo, deleteCard, likeCard, handleImageClick);
    API.addNewCard(newCardInfo).then((data)=> {
        console.log(data);
        addNewCard(newCard);
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
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

//обработка форм
formEdit.addEventListener('submit', handleFormProfileEdit);
formNewCard.addEventListener('submit', handleFormNewCard);

enableValidation(settings);




