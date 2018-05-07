const button = document.querySelector('#button');

button.addEventListener('click', (e) => {
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

});