// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, delFunction){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    deleteButton.addEventListener('click', delFunction);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const listItem = evt.target.closest('.places__item');
    listItem.remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    cardContainer.append(createCard(item, deleteCard));
})