import HikesController from "./teamActivity/hikesController";

const myHikesController = new HikesController('hikes');
window.addEventListener('load', () => {
    myHikesController.showHikeList();
});