class Game {
    constructor(infoAboutUser, notification, textNotification){
        this.infoAboutUser = infoAboutUser;
        // this.cardsField = cardsField;
        this.auido = new Audio();
        this.auido.src = 'audio/sound.mp3';
        this.notification = notification;
        this.textNotification = textNotification;
        this.textNotification.textContent = 'Congratulations on the victory!';
        this.textNotification.style['font-size'] = '35px';
    }

    createCssLink(){
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = 'css/gameStyle.css';
        const headPage = document.querySelector('head');
        headPage.appendChild(newLink);
    }

    createPage(){
        const wrapper = document.querySelector('#wrapper');
        const mainTag = document.createElement('main');

        wrapper.appendChild(mainTag);

        const sectionTag = document.createElement('section');
        mainTag.appendChild(sectionTag);

        const fieldForCard = document.createElement('section');
        fieldForCard.classList.add('fieldForCard');

        const figureTag = document.createElement('figure');
        figureTag.id = 'cardsField';

        fieldForCard.appendChild(figureTag);

        const optionalInfo = document.createElement('section');
        optionalInfo.classList.add('optionalInfo');

        sectionTag.appendChild(fieldForCard);
        sectionTag.insertBefore(optionalInfo, sectionTag.firstChild); 

        const button = document.createElement('a');
        button.classList.add('button-restart');
        button.textContent = 'New Game';
        mainTag.appendChild(button);


        //reload page for starting new game
        button.addEventListener('click', () => {
            location.reload();
        });

        return optionalInfo;
    }


   

    waitClick(complexity, workingTimer, clock, cardsField){

        let clickCounter = 0;
        let prevEl;
        cardsField.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                clickCounter++;
                //checking on fast user clicking
                if (clickCounter <= 2){
                    if((clickCounter !== 2 || prevEl.src === e.target.src) && e.target.className !== 'back'){
                         //show backside card
                        e.target.parentElement.firstChild.style.transform = 'perspective(600px) rotateY( 0deg)';
                        //hide fontside card
                        e.target.style.transform = 'perspective(600px) rotateY( -180deg)';
                        if(clickCounter === 2){
                            //very fast card changing
                            setTimeout(() => {
                                
                                if (prevEl.parentElement.firstChild.src !== e.target.parentElement.firstChild.src) {

                                    prevEl.parentElement.firstChild.style.transform = 'perspective(600px) rotateY( 180deg )';
                                    prevEl.style.transform = 'perspective(600px) rotateY( 0deg )';
                                    e.target.parentElement.firstChild.style.transform = 'perspective(600px) rotateY( 180deg )';
                                    e.target.style.transform = 'perspective(600px) rotateY( 0deg)';
                                    prevEl = '';

                                } else{

                                    this.auido.play();

                                    prevEl.parentElement.style.transition = 'opacity 2s, visibility 2s';
                                    e.target.parentElement.style.transition = 'opacity 2s, visibility 2s';

                                    prevEl.parentElement.style.opacity = '0';
                                    e.target.parentElement.style.opacity = '0';

                                    prevEl.parentElement.style.visibility = 'hidden';
                                    e.target.parentElement.style.visibility = 'hidden';

                                    complexity -= 2;
                                    if (complexity=== 0) {
                                        clearInterval(workingTimer);
                                        this.infoAboutUser['time'] = clock.textContent;
                                        const storage = new LocalStorage();
                                        
                                        let storageData = storage.getLocalStorage();
                                        storage.updateLocalStorage(this.infoAboutUser);

                                        this.notification.hidden = false;
                                    }
                                }
                                clickCounter = 0;   
                            }, 1000);
                            
                        } else{
                            prevEl = e.target;
                        }

                    }else {
                        (clickCounter === 2)? clickCounter--: clickCounter;
                    }
                } 
                    
            }
        });
    }
}