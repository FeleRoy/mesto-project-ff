import { closeModal } from "./modal";
import { profileTitle,  profileDescription, popupEdit, formEdit, popupNewCard, formNewCard} from "../..";
import { createCard, addNewCard, deleteCard } from "./cards";


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = formEdit.name.value;
    profileDescription.textContent = formEdit.description.value;
    closeModal(popupEdit);
}

export function handleFormNewCard(evt){
    evt.preventDefault();
    const newCardInfo = {name: formNewCard['place-name'].value, link: formNewCard.link.value};
    const newCard = createCard(newCardInfo, deleteCard);
    addNewCard(newCard);
    formNewCard['place-name'].value = '';
    formNewCard.link.value = '';
    closeModal(popupNewCard);
}
