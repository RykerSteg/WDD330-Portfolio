import HikesController from "./hikesController";

const myHikesController = new HikesController('hikes');
window.addEventListener('load', () => {
    myHikesController.showHikeList();
});