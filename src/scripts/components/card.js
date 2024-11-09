export function createCard(item, API, imageClickFunction, userID){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const Image = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__like-score').textContent = item.likes;
    if (item.cardOwnerID === userID){
      deleteButton.addEventListener('click', ()=>{deleteCard(cardElement, item.cardID, API.deleteCard)});
    } else {
      deleteButton.style.display = "none";
    }
    
    likeButton.addEventListener('click', likeCard);
    Image.addEventListener('click', imageClickFunction);
    return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(card, cardID, delAPIFunction) {
  delAPIFunction(cardID).then(()=> {
    card.remove();
  })
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

