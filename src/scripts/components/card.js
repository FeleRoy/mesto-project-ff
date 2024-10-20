export function createCard(item, delFunction, likeFunction, imageClickFunction){
    const cardTemplate = document.querySelector('#card-template').content;
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

