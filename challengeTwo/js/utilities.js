export function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

export function setToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function bindTouch(selector, callback) {
    const element = document.querySelector(selector);
    element.addEventListener("click", callback);
}