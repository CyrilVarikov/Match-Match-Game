class TableOfRecords{
    constructor(optionalInfo){
        this.optionalInfo = optionalInfo;
    }

    createTable(){
        
        const sectionForTable = document.createElement('section');
        sectionForTable.classList.add('records');
        const heading = document.createElement('h2');

        heading.textContent = 'Top 10 players:';
        sectionForTable.appendChild(heading);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const thName = document.createElement('th');
        const thTime = document.createElement('th');
        const thComplexity = document.createElement('th');

        thName.textContent = 'First name';
        tr.appendChild(thName);
        thTime.textContent = 'Time';
        tr.appendChild(thTime);
        thComplexity.textContent = 'Complexity';
        tr.appendChild(thComplexity);
        thead.appendChild(tr);
        table.appendChild(thead);


        const tbody = document.createElement('tbody');
        const trBody = document.createElement('tr');


        for (let i = 0; i < 3; i++) {
            const tdBody = document.createElement('td');
            trBody.appendChild(tdBody);     
        }
        tbody.appendChild(trBody);
        table.appendChild(tbody);

        sectionForTable.appendChild(table);

        const button = document.createElement('a');
        button.classList.add('button-reset');
        button.textContent = 'Reset';

        button.addEventListener('click', () => {
            localStorage.clear();
            if (table.children.length > 1) {
                table.removeChild(table.lastChild);
            }
            
        });
        
        sectionForTable.appendChild(button);

        this.optionalInfo.appendChild(sectionForTable);
        return table;

    }

    fillOutTable(table) {
 
        const complexityObj = {
            'L' : 0,
            'M' : 1,
            'H' : 2
        }

        const storage = new LocalStorage();
    
        let storageData = storage.getLocalStorage();
        storageData = storage.sortStorage();

        table.removeChild(table.lastChild);
        const tbody = document.createElement('tbody');
        
        storageData.forEach(elem => {
            const trBody = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdTime = document.createElement('td');
            const tdComplexity = document.createElement('td');

            tdName.textContent = elem.firstName;
            tdTime.textContent = elem.time;
            tdComplexity.textContent = elem.complexity;

            trBody.appendChild(tdName);
            trBody.appendChild(tdTime);
            trBody.appendChild(tdComplexity);
            tbody.appendChild(trBody);
        });
        table.appendChild(tbody);
    }
}