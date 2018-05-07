class Card {
    constructor(infoAboutUser){
        this.infoAboutUser = infoAboutUser;
    }

    createCards(){
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
        let fontSideFirst = '';
        let fontSideSecond = '';

        switch(this.infoAboutUser.skirtSrc){
            case 'images/preparing-page/space.jpg':
                fontSideFirst = 'images/preparing-page/for-space/earth.jpg';
                fontSideSecond = 'images/preparing-page/for-space/mars.jpg';
                break;
            case 'images/preparing-page/GOT.jpg':
                fontSideFirst = 'images/preparing-page/for-got/jon.jpg';
                fontSideSecond = 'images/preparing-page/for-got/kon.jpg';
                break;
            case 'images/preparing-page/programming-skirt.jpg':
                fontSideFirst = 'images/preparing-page/for-programming/css.jpg';
                fontSideSecond = 'images/preparing-page/for-programming/js.jpg';
                break;
        }


        let fontSides = [];

        for (let i = 0; i < length; i++) {
            if (i > length / 2 - 1) {
                fontSides.push(fontSideSecond);
            } else{
                fontSides.push(fontSideFirst);
            }
        }
        //shuffle array
        fontSides.sort((a, b) => Math.random() - 0.5 );

        const cardsInfo = {
            fontSides : fontSides,
            margin : margin,
            width : width,
            height : height,
            complexity : length
        }
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