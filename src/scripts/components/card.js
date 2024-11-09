export function createCard(cardData, API, imageClickFunction, userID) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const Image = cardElement.querySelector(".card__image");
  const likeScore = cardElement.querySelector(".card__like-score");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeScore.textContent = cardData.likes.length;
  if (cardData.owner._id === userID) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardData._id, API.deleteCard);
    });
  } else {
    deleteButton.style.display = "none";
  }

  const isLiked = cardData.likes.some((user) => user._id === userID);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (evt) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      API.deleteLikeCard(cardData._id)
        .then((data) => {
          likeCard(evt);
          cardData.likes.pop({ _id: userID });
          likeScore.textContent = cardData.likes.length;
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      API.addLikeCard(cardData._id)
        .then((data) => {
          likeCard(evt);
          cardData.likes.push({ _id: userID });
          likeScore.textContent = cardData.likes.length;
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  });
  Image.addEventListener("click", imageClickFunction);
  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(card, cardID, delAPIFunction) {
  delAPIFunction(cardID).then(() => {
    card.remove();
  });
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
