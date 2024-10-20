import './pages/index.css'; 
import { displayCards } from './scripts/components/cards';
import { openModal, closeModal, closeByEsc, closeByOverlay } from './scripts/components/modal';
import { handleFormSubmit, handleFormNewCard } from './scripts/components/form';

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
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlay);
});
profileAddButtonOpen.addEventListener('click', function(){
    openModal(popupNewCard);
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlay);
});
profileEditButtonClose.addEventListener('click', function(){
    closeModal(popupEdit);
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByOverlay);
});
profileAddButtonClose.addEventListener('click', function(){
    closeModal(popupNewCard);
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByOverlay);
});
popupImageButtonClose.addEventListener('click', function(){
    closeModal(popupImage);
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByOverlay);
});

//обработка форм
formEdit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormNewCard);
