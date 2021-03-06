import { getJSON, setToLS, getFromLS, bindTouch } from "./utilities.js";

const genBtn = document.getElementById("generate");
let url="";
const output = document.getElementById("outputDiv");
const listOuput = document.getElementById("list");
const recipeNum = document.getElementById("recipeNum");
let ingredients;
let groceryList = null;
const mealContent = document.getElementById('mealSelectorContent');
const groceryContent = document.getElementById('groceryListContent');
const recipeContent = document.getElementById('recipeContent');
const mealTab = document.getElementById('mealSelector');
const groceryTab = document.getElementById('groceryListTab');
const recipeTab = document.getElementById('recipeTab');
let tabs = document.getElementById("tabs");
tabs.addEventListener('click', tabChange)
    

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

genBtn.addEventListener("click",function(event) {
  event.preventDefault();

    url = `https://api.spoonacular.com/recipes/random?apiKey=fe722734adf14f0da7114cf4ea31809d&limitLicense=true&number=${recipeNum.value}`;

  let mealList = fetch(url)
    .then(function (response) {
      if(!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })

    .then(function (jsonObject) {
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
           renderGroceries(ingredients)
        });

        btn.addEventListener('click', function() {
          renderRecipe(recipe)
        });
        

        card.appendChild(h2);
        card.appendChild(btn);

        output.appendChild(card);
      });
      console.log(jsonObject);
      ingredients = meals[0]["extendedIngredients"];
      console.log(ingredients)
    })
  })

function renderRecipe(recipe) {
  let recipeCard = document.createElement('section');
  let recipeTitle = document.createElement('h2');
  let recipeContent = document.createElement('div');
  let btn = document.createElement('button');

  recipeTitle.textContent = `${recipe.title}`;
  recipeContent.innerHTML = `${recipe.instructions}`;
  btn.textContent = "Delete";
  btn.classList.add('delete');

  recipeCard.appendChild(recipeTitle);
  recipeCard.appendChild(recipeContent);
  recipeCard.appendChild(btn);
  recipeTitle.setAttribute('class', 'title');

  let recipeOutput = document.getElementById('recipeContent');

  recipeOutput.appendChild(recipeCard);
}
  

function renderGroceries(array) {
  groceryList =
  array.forEach(ingredient => {
    let li = document.createElement("li");
    let listItem = ingredient['nameClean'];

    li.innerHTML = `<label><input type="checkbox">${listItem}</label><button class="delete">Delete</button>`;

    listOuput.appendChild(li);

    addListItem(li, )
    
    //localStorage.setItem("groceries", groceryList);
  })
}

function getList(key) {
  if ( groceryList === null) {
    
    groceryList = localStorage.getItem(key);
  }
  //listOuput.textContent = renderGroceries(groceryList);
}
console.log(getList('groceries'))

function addListItem(value, key) {
  const newlistItem = {
      id: new Date(),
      content: value,
      completed: false
  };

  groceryList.push(newlistItem);
  setToLS(key, groceryList);
}

function deleteListItem(key) {
  let list = todoList.filter(item => item.id != key);
  todoList = list;
  setToLS(key, todoList);
}
