
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