const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
      authorization: 'f87f4fe1-245b-4277-814c-ff9026ea0714',
      'Content-Type': 'application/json'
    },
    cohortId: "pwff-cohort-1"
  }

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    }).then(handleResponse);
};

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    }).then(handleResponse);
}

export const editUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
}

export const addNewCard = (newCardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
           name: newCardData.name,
           link: newCardData.link 
        })
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`,{
        method: "DELETE",
        headers: config.headers,
    })
}

export const addLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method: "PUT",
        headers: config.headers,
    })
}

export const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
        method: "DELETE",
        headers: config.headers,
    })
}

export const editUserImage = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
}