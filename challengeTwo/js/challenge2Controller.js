import { setToLS, getFromLS, bindTouch } from "./utilities.js";

let groceryList = null;
let recipeList = null;
let url="";

const listOuput = document.getElementById("list");
const recipeNum = document.getElementById("recipeNum");
let ingredients;
const mealContent = document.getElementById('mealSelectorContent');
const groceryContent = document.getElementById('groceryListContent');
const recipeContent = document.getElementById('recipeContent');
const mealTab = document.getElementById('mealSelector');
const groceryTab = document.getElementById('groceryListTab');
const recipeTab = document.getElementById('recipeTab');
let tabs = document.getElementById("tabs");
tabs.addEventListener('click', tabChange)

function renderRecipe(recipe, key) {
    let recipeCard = document.createElement('section');
    let recipeTitle = document.createElement('h2');
    let recipeContent = document.createElement('div');
    let btn = document.createElement('button');
  
    recipeTitle.innerHTML = `<a href="#">${recipe.title}</a>`;
    recipeContent.innerHTML = `${recipe.instructions}`;
    recipeContent.classList.add('recipeContent')
    btn.textContent = "Delete";
    btn.classList.add('delete');
  
    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeContent);
    recipeCard.appendChild(btn);
    recipeTitle.setAttribute('class', 'title');
    
    recipeCard.classList.add('card');

    let recipeOutput = document.getElementById('recipeContent');
  
    recipeOutput.appendChild(recipeCard);
    let deleteBtns = document.querySelectorAll('.delete');
      deleteBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            btn.parentElement.remove();
          });

    });
}
function renderGroceriesFromLs(key, array) {
    array.forEach(ingredient => {
      let li = document.createElement("li");
      let listItem = ingredient;
  
      li.innerHTML = `<label><input type="checkbox">${listItem}</label><br><button class="delete">Delete</button>`;
  
      li.classList.add('glItem');
      listOuput.appendChild(li);
      groceryList.push(listItem);
      })
      let deleteBtns = document.querySelectorAll('.delete');
      deleteBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            btn.parentElement.remove();
            let newArrayItems = Array.from(document.querySelectorAll('.glItem'));
            let newArray = [];
            newArrayItems.forEach(item =>{
                let listItem = item.firstChild.textContent;
                newArray.push(listItem);
            })
            groceryList = newArray
            setToLS(key, groceryList);
            console.log(groceryList)
          });
        });
}
function renderGroceries(key, array) {
    array.forEach(ingredient => {
      let li = document.createElement("li");
      let listItem = ingredient['nameClean'];
  
      li.innerHTML = `<label><input type="checkbox">${listItem}</label><br><button class="delete">Delete</button>`;
      li.classList.add("glItem");
  
      listOuput.appendChild(li);
      groceryList.push(listItem);
      })
      setToLS(key, groceryList)
      let deleteBtns = document.querySelectorAll('.delete');
      deleteBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            btn.parentElement.remove();
            let newArrayItems = Array.from(document.querySelectorAll('.glItem'));
            let newArray = [];
            newArrayItems.forEach(item =>{
                let listItem = item.textContent
                newArray.push(listItem);
            })
            groceryList = newArray
            setToLS(key, groceryList);
            console.log(groceryList)
          });
        });
}

function tabChange() {
    if(mealTab.checked === true) {
      mealContent.classList.add('visible');
      groceryContent.classList.remove('visible');
      recipeContent.classList.remove('visible');
    } else if(groceryTab.checked === true) {
      groceryContent.classList.add('visible');
      recipeContent.classList.remove('visible');
      mealContent.classList.remove('visible');
    } else if(recipeTab.checked === true) {
      recipeContent.classList.add('visible');
      mealContent.classList.remove('visible');
      groceryContent.classList.remove('visible');
    }
}

// function addListItem(value, key) {
//     const newlistItem = {
//         id: new Date(),
//         content: value,
//         completed: false
//     };

//     groceryList.push(newlistItem);
//     setToLS(key, groceryList);
//     console.log(getFromLS(key));
// }

function getListItems(key, list) {
    if (list === null) {
        list = getFromLS(key) || [];
    }
    return list
}

export default class GroceryList {

    constructor(listItem, key) {
        this.listItem = listItem;
        this.key = key;

        bindTouch("#generate", this.generateMeals.bind(this));

        this.listItems();
        //localStorage.clear()
    }

    generateMeals() {
        event.preventDefault();
        let output = document.getElementById("outputDiv");
        let key = this.key
      
          url = `https://api.spoonacular.com/recipes/random?apiKey=fe722734adf14f0da7114cf4ea31809d&limitLicense=true&number=${recipeNum.value}`;
          
        let mealList = fetch(url)
            .then(function (response) {
                if(!response.ok) {
                  throw Error(response.statusText);
                } else {
                  return response.json();
                }
            })
          
            .then(function (jsonObject,) {
                const meals = jsonObject['recipes'];
                output.innerHTML = "";
                meals.forEach(recipe => {
                  let card = document.createElement('section');
                  let h2 = document.createElement('h2');
                  let btn = document.createElement('button');
          
                  h2.textContent = `${recipe.title}`;
                  h2.setAttribute('class', 'title');
                  btn.textContent = "Save";
                  btn.setAttribute("class", "saveBtn");
          
                  ingredients = meals[0]["extendedIngredients"];
          
                  btn.addEventListener('click', function() {
                    renderGroceries(key, ingredients);
                  });

                  btn.addEventListener('click', function() {
                    renderRecipe(recipe, key)
                  });
          
                  card.appendChild(h2);
                  card.appendChild(btn);
          
                  output.appendChild(card);
                });
                console.log(jsonObject);
                ingredients = meals[0]["extendedIngredients"];
                console.log(ingredients)
            })
    }
    listItems() {
        groceryList = getListItems(this.key, groceryList);
        recipeList = getListItems("recipes", recipeList);
        renderGroceriesFromLs(this.key, groceryList);
        }
    }
