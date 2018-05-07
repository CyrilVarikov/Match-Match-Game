const skirts = document.querySelector('#skirt');
const difficulty = document.querySelector('#difficulty');
const button = document.querySelector('#button');

//notification
const notification = document.querySelector('#notification');
const textNotification = document.querySelector('#articleForNotification');
const closeNotification = document.querySelector('#close-notification');
textNotification.textContent = 'Please, input information about you, choose skirt and difficulty-game!';

let skirtSrc = '';
let complexity = '';


closeNotification.addEventListener('click', (e) => {
    notification.hidden = true;
});

skirt.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG'){ 
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            e.target.parentElement.children[i].style.removeProperty('border');                   
        }
        e.target.style.border = '2px solid red';
        skirtSrc = e.target.getAttribute('src');                
    }
});

difficulty.addEventListener('click', (e) => {
    if(e.target.tagName === 'SPAN'){ 
        for (let i = 0; i < e.target.parentElement.children.length; i++) {
            e.target.parentElement.children[i].style.removeProperty('border');                   
        }
        e.target.style.border = '2px solid #240f1a';
        complexity = e.target.textContent[0];                                
    }
});

const pulse = function(e, button){
    const addSection = document.createElement('section');
    const sizeValue = Math.max(button.clientHeight, button.clientWidth);
    let styleSection = addSection.style;
    const buttInfo = button.getBoundingClientRect();

    if(button.children.length > 0){
        button.removeChild(button.firstElementChild);
    }

    styleSection.width = styleSection.height = `${sizeValue}px`;
    styleSection.left = `${e.clientX - buttInfo.left - (sizeValue / 2)}px`;
    styleSection.top = `${e.clientY - buttInfo.top - (sizeValue / 2)}px`;

    addSection.classList.add('pulse');

    button.appendChild(addSection);
}



button.addEventListener('click', (e) => {
    pulse(e, button);
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');

    if (!firstName.value  || !lastName.value || !email.value || 
            !complexity || !skirtSrc) {

        notification.hidden = false;

    } else {
        const wrapper = document.querySelector('#wrapper');

        const infoAboutUser = {
            firstName : firstName.value,
            lastName : lastName.value,
            email : email.value,
            complexity : complexity,
            skirtSrc : skirtSrc
        }
       //delete current elements from page
        wrapper.textContent = '';
        
        //if user fillout all, but didn't close notification!
        notification.hidden = true;

        const game = new Game(infoAboutUser, notification, textNotification);


        game.createCssLink();

        
        //geting section with timer and records

        const optionalInfo = game.createPage();

        const card = new Card(infoAboutUser);

        const cards = card.createCards();

        const cardsField = card.giveOutCards(cards);
        //creating records and timer
        const tableOfRecords = new TableOfRecords(optionalInfo);
        const timer = new Timer(optionalInfo);


        const clock = timer.createTimer();

        const table = tableOfRecords.createTable();

        tableOfRecords.filloutTable(table);
        

        const workingTimer = timer.startTime();

        game.waitClick(cards.complexity, workingTimer, clock, cardsField);
    }
});


    


