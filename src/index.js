import './pages/index.css'; 
import { displayCards, createCard, addNewCard, deleteCard, likeCard, handleImageClick } from './scripts/components/card';
import { openModal, closeModal, closeByEsc, closeByOverlay } from './scripts/components/modal';

//данные профиля
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

//модальные окна
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
export const formEdit = popupEdit.querySelector('form');
export const formNewCard = popupNewCard.querySelector('form');


// кнопки
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileAddButtonOpen = document.querySelector('.profile__add-button');
const profileEditButtonClose = popupEdit.querySelector('.popup__close');
const profileAddButtonClose = popupNewCard.querySelector('.popup__close');
const popupImageButtonClose = popupImage.querySelector('.popup__close');

//отображение карточек
displayCards();

//добавление слушателей открытия и закрытия окон
profileEditButtonOpen.addEventListener('click', function(){
    formEdit.name.value = profileTitle.textContent;
    formEdit.description.value = profileDescription.textContent;
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
formEdit.addEventListener('submit', editProfileFormSubmit);
formNewCard.addEventListener('submit', handleFormNewCard);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = formEdit.name.value;
    profileDescription.textContent = formEdit.description.value;
    closeModal(popupEdit);
}

//Обработчик создания новой карточки
function handleFormNewCard(evt){
    evt.preventDefault();
    const newCardInfo = {name: formNewCard['place-name'].value, link: formNewCard.link.value};
    const newCard = createCard(newCardInfo, deleteCard, likeCard, handleImageClick);
    addNewCard(newCard);
    formNewCard['place-name'].value = '';
    formNewCard.link.value = '';
    closeModal(popupNewCard);
}
