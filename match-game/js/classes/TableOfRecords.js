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

    filloutTable(table) {
        const getLocalStorage = function(){
            let storage = [];
            for (let i = 0; i < localStorage.length; i++) {
               storage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
            return storage;
        }
        
        const complexityObj = {
            'L' : 0,
            'M' : 1,
            'H' : 2
        }

        const storage = getLocalStorage();
    
        storage.sort((a, b) => {
            if (complexityObj[a.complexity] > complexityObj[b.complexity]) {
                return -1;
            } else if(complexityObj[a.complexity] < complexityObj[b.complexity]) {
                return 1;
            }else{
                let aTimes = a.time.split(':');
                aTimes = aTimes.map(elem => +elem);
                let bTimes = b.time.split(':');
                bTimes = bTimes.map(elem => +elem);
                if (bTimes[0] <= aTimes[0] && bTimes[1] <= aTimes[1] && bTimes[2] <= aTimes[2]) {
                    return 1;
                }else{
                    return -1;
                }
            }
        });

        table.removeChild(table.lastChild);
        const tbody = document.createElement('tbody');
        
        storage.forEach(elem => {
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