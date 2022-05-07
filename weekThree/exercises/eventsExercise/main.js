/*function doSomething() {
    console.log(event.target);
}

addEventListener('click', doSomething); */

/*function doSomething(event){
    console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`)
}
addEventListener('click', doSomething); */

const clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click',() => console.log('click') );
clickParagraph.addEventListener('mousedown',() => console.log('down') );
clickParagraph.addEventListener('mouseup',() => console.log('up') );

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);

function highlight(event){
    event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);

mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!') );

addEventListener('keydown', highlight);

addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}`));

addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));

const onceP = document.getElementById('once');
onceP.addEventListener('click', remove);

function remove(event) {
    console.log('Enjoy this while it lasts!');
    onceP.style.backgroundColor = 'pink';
    onceP.removeEventListener('click',remove);
}

const brokenLink = document.getElementById('broken');

brokenLink.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');

//ulElement.addEventListener('click', (event) => console.log('Clicked on ul') );

//liElement.addEventListener('click', (event) => console.log('Clicked on li') );

//ulElement.addEventListener('click', (event) => console.log('Clicked on ul'),true);

//liElement.addEventListener('click', (event) => console.log('Clicked on li'), true);

ulElement.addEventListener('click' , highlight);