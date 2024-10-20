import './pages/index.css'; 
import { displayCards } from './scripts/components/cards';
import { openModal, closeModal, closeByEsc, closeByOverlay } from './scripts/components/modal';
import { handleFormSubmit, handleFormNewCard } from './scripts/components/form';

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');


export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
export const formEdit = popupEdit.querySelector('form');
export const formNewCard = popupNewCard.querySelector('form');

const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileAddButtonOpen = document.querySelector('.profile__add-button');
const profileEditButtonClose = popupEdit.querySelector('.popup__close');
const profileAddButtonClose = popupNewCard.querySelector('.popup__close');

displayCards();

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




document.addEventListener('keydown', closeByEsc);

document.addEventListener('click', closeByOverlay);

formEdit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormNewCard);
