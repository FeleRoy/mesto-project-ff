import { closeModal } from "./modal";
import { profileTitle,  profileDescription, popupEdit, formEdit, popupNewCard, formNewCard} from "../..";
import { createCard, addNewCard, deleteCard, likeCard, handleImageClick } from "./card";


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = formEdit.name.value;
    profileDescription.textContent = formEdit.description.value;
    closeModal(popupEdit);
}

//Обработчик создания новой карточки
export function handleFormNewCard(evt){
    evt.preventDefault();
    const newCardInfo = {name: formNewCard['place-name'].value, link: formNewCard.link.value};
    const newCard = createCard(newCardInfo, deleteCard, likeCard, handleImageClick);
    addNewCard(newCard);
    formNewCard['place-name'].value = '';
    formNewCard.link.value = '';
    closeModal(popupNewCard);
}
