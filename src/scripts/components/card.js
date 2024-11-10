export const handleLikeToggle = (
  likeButton,
  cardData,
  userId,
  addLike,
  deleteLike,
  likeScore
) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardData._id)
      .then(() => {
        likeButton.classList.remove("card__like-button_is-active");
        cardData.likes = cardData.likes.filter((user) => user._id !== userId);
        likeScore.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(`Ошибка удаления лайка: ${err}`));
  } else {
    addLike(cardData._id)
      .then(() => {
        likeButton.classList.add("card__like-button_is-active");
        cardData.likes.push({ _id: userId });
        likeScore.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(`Ошибка добавления лайка: ${err}`));
  }
};
export const handleDeleteCard = (card, cardId, deleteFromServer) => {
  deleteFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
};

export function createCard(
  cardData,
  userId,
  imageClickFunction,
  handleLikeToggle,
  handleDeleteCard,
  deleteFromServer,
  addLike,
  deleteLike
) {
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
  const isLiked = cardData.likes.some((user) => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      handleDeleteCard(cardElement, cardData._id, deleteFromServer);
    });
  } else {
    deleteButton.style.display = "none";
  }
  Image.addEventListener("click", imageClickFunction);
  likeButton.addEventListener("click", () => {
    handleLikeToggle(
      likeButton,
      cardData,
      userId,
      addLike,
      deleteLike,
      likeScore
    );
  });
  return cardElement;
}
