class LocalStorage{

    constructor(){
        this.storage = [];
    }

    getLocalStorage(){
        for (let i = 0; i < localStorage.length; i++) {
            this.storage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return this.storage;
    }

    sortStorage(){
        if(this.storage !== null){
            const complexityObj = {
                'L' : 0,
                'M' : 1,
                'H' : 2
            }

            this.storage.sort((a, b) => {
                if (complexityObj[a.complexity] > complexityObj[b.complexity]) {
                    return -1;
                } else if(complexityObj[a.complexity] < complexityObj[b.complexity]) {
                    return 1;
                }else{
                    let aTimes = a.time.split(':');
                    aTimes = aTimes.map(elem => +elem);
                    let bTimes = b.time.split(':');
                    bTimes = bTimes.map(elem => +elem);
                    if (bTimes[0] < aTimes[0] || bTimes[1] < aTimes[1] || bTimes[2] < aTimes[2]) {
                        return -1;
                    }else{
                        return 1;
                    }
                }
            });
            return this.storage;
        }
    }

    updateLocalStorage(user){
        this.storage.push(user);               
        

        this.sortStorage();
        
        const length = (this.storage.length < 10?this.storage.length:10)
        localStorage.clear();
        for (let i = 0; i < length; i++) {
            localStorage.setItem(this.storage[i].email, JSON.stringify(this.storage[i]));
        }   
    }
}