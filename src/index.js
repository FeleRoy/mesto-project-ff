import './pages/index.css'; 
import { displayCards } from './scripts/components/cards';
import { openModal, closeModal } from './scripts/components/modal';

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileAddButtonOpen = document.querySelector('.profile__add-button');
const profileEditButtonClose = popupEdit.querySelector('.popup__close');
const profileAddButtonClose = popupNewCard.querySelector('.popup__close');

displayCards();

profileEditButtonOpen.addEventListener('click', function(){
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

document.addEventListener('keydown', function(evt){
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === "Escape"){
        closeModal(popup);
    }
})

document.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});
