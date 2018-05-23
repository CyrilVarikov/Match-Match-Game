class Card {
    constructor(infoAboutUser){
        this.infoAboutUser = infoAboutUser;
    }

    getCardsInfo(){
        let length = 0;
        let margin = '';
        let width = '';
        let height = '';
        switch(this.infoAboutUser.complexity){
            case 'L' : 
                length = 8;
                margin = '0 51px';
                width = '120px';
                height = '170px';
                break;
            case 'M' :
                length = 16;
                width = '100px';
                height = '150px';
                margin = '0 15px';
                break;
            case 'H' :
                width = '100px';
                height = '150px';
                margin = '0 15px';
                length = 24;
                break;
        }

        return {
            fontSides : [],
            margin : margin,
            width : width,
            height : height,
            complexity : length
        }

    }

    getCardsSkirt(){
        let fontSideFirst = '';
        let fontSideSecond = '';
        let fontSideThird = '';
        let fontSideFourth = '';
        switch(this.infoAboutUser.skirtSrc){
            case 'images/preparing-page/space.jpg':
                fontSideFirst = 'images/preparing-page/for-space/earth.jpg';
                fontSideSecond = 'images/preparing-page/for-space/mars.jpg';
                fontSideThird = 'images/preparing-page/for-space/jupiter.jpg';
                fontSideFourth = 'images/preparing-page/for-space/mercury.jpg';
                break;
            case 'images/preparing-page/GOT.jpg':
                fontSideFirst = 'images/preparing-page/for-got/jon.jpg';
                fontSideSecond = 'images/preparing-page/for-got/kon.jpg';
                fontSideThird = 'images/preparing-page/for-got/tyrion.jpg';
                fontSideFourth = 'images/preparing-page/for-got/daynery.jpg';
                break;
            case 'images/preparing-page/programming-skirt.jpg':
                fontSideFirst = 'images/preparing-page/for-programming/css.jpg';
                fontSideSecond = 'images/preparing-page/for-programming/js.jpg';
                fontSideThird = 'images/preparing-page/for-programming/html5.jpg';
                fontSideFourth = 'images/preparing-page/for-programming/nodejs.jpg';
                break;
        }

        return {
            fontSideFirst : fontSideFirst,
            fontSideSecond : fontSideSecond,
            fontSideThird : fontSideThird,
            fontSideFourth : fontSideFourth
        }
        
    }

    createCards(){
        let cardsInfo = {
            fontSides : [],
            margin : '',
            width : '',
            height : '',
            complexity : 0
        }
        
        cardsInfo = this.getCardsInfo();

        let fonts = {
            fontSideFirst : '',
            fontSideSecond : '',
            fontSideThird : '',
            fontSideFourth : ''
        }
        
        fonts = this.getCardsSkirt();
        


        let fontSides = [];

        for (let i = 0; i < cardsInfo.complexity / 4 ; i++) {
            fontSides.push(fonts.fontSideFirst);
        }
        for (let i = 0; i < cardsInfo.complexity / 4 ; i++) {
            fontSides.push(fonts.fontSideSecond);
        }
        for (let i = 0; i < cardsInfo.complexity / 4 ; i++) {
            fontSides.push(fonts.fontSideThird);
        }
        for (let i = 0; i < cardsInfo.complexity / 4 ; i++) {
            fontSides.push(fonts.fontSideFourth);
        }
        //shuffle array
        fontSides.sort((a, b) => Math.random() - 0.5 );

        cardsInfo.fontSides = fontSides;
        
        return cardsInfo;
    }

    giveOutCards(cards)  {
          
        const cardsField = document.querySelector('#cardsField');
        for (let i = 0; i < cards.complexity; i++) {
            //creating wrapper for animation
            const flip = document.createElement('div');
            flip.classList.add('flip');
            flip.style.margin = cards.margin;
            flip.style.width = cards.width;
            flip.style.height = cards.height;
            
            //creating fontside of cards
            const fontCard = document.createElement('img');
            fontCard.classList.add('font');
            fontCard.src = this.infoAboutUser.skirtSrc;
            fontCard.style.width = cards.width;
            fontCard.style.height = cards.height;

            //creating backside of cards
            const backCard = document.createElement('img');
            backCard.classList.add('back');
            backCard.src = cards.fontSides[i];
            backCard.style.width = cards.width;
            backCard.style.height = cards.height;

            flip.appendChild(backCard);
            flip.appendChild(fontCard);
            
            //adding created card to game-field
            cardsField.appendChild(flip);
        }
        return cardsField;
    }
}