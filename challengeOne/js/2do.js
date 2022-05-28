import { setToLS, getFromLS, bindTouch } from "./utilities.js";

let todoList = null;

function renderTodoList(list, element, items, hidden) {
    element.innerHTML = "";

    list.forEach(listItem => {
        const item = document.createElement('li');
        
        let box = null;
        let btn = null;

        if(hidden && listItem.completed) {
            item.innerHTML = `<label><input type="checkbox" checked><strike>${listItem.content}</strike></label><button>Delete</button>`;
        } else {
            item.innerHTML = `<label><input type="checkbox">${listItem.content}</label><button>Delete</button>`;
        }
        
        box = item.childNodes[0].childNodes[0];

        if(box) {
            box.addEventListener("change", function() {
                items.completedListItem(listItem.id);
            });
        }

        btn = item.childNodes[1];
        if(btn) {
            btn.addEventListener('click', function() {
                items.removeListItem(listItem.id);
            });
        }

        let showActive = document.getElementById("active");
        let showAll = document.getElementById("all");

        if(listItem.completed) {

            showActive.addEventListener("change", function() {
            item.classList.add("notActive");
            });
            showAll.addEventListener("change", function() {
                item.classList.remove("notActive");
            })
        }

        element.appendChild(item);
    });
}

function addListItem(value, key) {
    const newlistItem = {
        id: new Date(),
        content: value,
        completed: false
    };

    todoList.push(newlistItem);
    setToLS(key, todoList);
}

function deleteListItem(key) {
    let list = todoList.filter(item => item.id != key);
    todoList = list;
    setToLS(key, todoList);
}

function getListItems(key) {
    if (todoList === null) {
        todoList = getFromLS(key) || [];
    }
    return todoList;
}

// function showActive() {
//     let showActive = document.getElementById("active")

//     showActive.addEventListener("change", function() {
//         filterItems(listItem.id);
//     })
// }
export default class TodoList {

    constructor(listItem, key) {
        this.listItem = listItem;
        this.key = key;

        bindTouch("#addItem", this.newListItem.bind(this));
        this.listItems();
    }

    newListItem() {
        const todo = document.getElementById('taskInput');
        addListItem(todo.value, this.key);
        todo.value = "";
        this.listItems();
    }

    findListItem(id) {
        let todo = todoList.find(element => {
            return element.id === id;
        });
        return todo;
    }

    completedListItem(id) {
        let todo = this.findListItem(id);

        if (todo) {
            todo.completed = !todo.completed;
            setToLS(this.key, todoList);
            renderTodoList(todoList, this.listItem, this, true);
        }
    }

    removeListItem(id) {
        let todo = this.findListItem(id);

        if(todo) {
            deleteListItem(id);
            renderTodoList(todoList, this.listItem, this, true);
        }
    }

    filterItems(id) {
        let todo = document.getElementById(id);

        if(todo) {
            todo.classList.add('notActive');
        }
    }

    listItems(hidden = true) {
        renderTodoList(getListItems(this.key), this.listItem, this, hidden);
    }
}