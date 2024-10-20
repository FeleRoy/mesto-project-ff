import { initialCards } from "./cards";
import { popupImage } from "../..";
import { openModal } from "./modal";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(item, delFunction, likeFunction, imageClickFunction){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const Image = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    deleteButton.addEventListener('click', delFunction);
    likeButton.addEventListener('click', likeFunction);
    Image.addEventListener('click', imageClickFunction);
    return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
    const listItem = evt.target.closest('.places__item');
    listItem.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function addNewCard(card){
  cardContainer.prepend(card);
}

export function handleImageClick(evt){
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.parentElement.querySelector(".card__title").textContent;
  openModal(popupImage);
}

// @todo: Вывести карточки на страницу
export function displayCards(){
initialCards.forEach(function (item) {
    cardContainer.append(createCard(item, deleteCard, likeCard, handleImageClick));
})
}