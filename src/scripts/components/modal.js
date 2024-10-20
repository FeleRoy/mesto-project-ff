
export function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
}
export function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
}

export function closeByEsc(evt){
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === "Escape"){
        closeModal(popup);
    }
    evt.target.removeEventListener('keydown', closeByEsc);
}

export function closeByOverlay(evt){
    if(evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
    evt.target.removeEventListener('click', closeByOverlay);
}