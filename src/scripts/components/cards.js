const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(item, delFunction, likeFunction){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    deleteButton.addEventListener('click', delFunction);
    likeButton.addEventListener('click', likeFunction);
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


// @todo: Вывести карточки на страницу
export function displayCards(){
initialCards.forEach(function (item) {
    cardContainer.append(createCard(item, deleteCard, likeCard));
})
}