class Timer {
    constructor(optionalInfo){
        this.optionalInfo = optionalInfo;
        this.clock = null;
    }

    createTimer(){
        const sectionForTimer = document.createElement('section');
        sectionForTimer.classList.add('timer');
        const clock = document.createElement('span');
        clock.textContent = '00.00.00';
        sectionForTimer.appendChild(clock);
        this.optionalInfo.insertBefore(sectionForTimer, this.optionalInfo.firstChild);
        this.clock = clock;
        return clock;
    }

    startTime(){
        if(this.clock !== null){
            let currTime = new Date();
            let workingTimer = setInterval(() => {
                let newTime = new Date() - currTime;
                let sec = Math.abs(Math.floor(newTime / 1000) % 60);
                let min = Math.abs(Math.floor((newTime / 1000 / 60) % 60));
                let hours = Math.abs(Math.floor((newTime / 1000 / 60 / 60) % 24));
                if (sec.toString().length === 1) {
                    sec = `0${sec}`;
                }
                if (min.toString().length === 1){
                    min = `0${min}`;
                }
                if (hours.toString().length === 1) {
                    hours = `0${hours}`;
                }
                this.clock.textContent = `${hours}:${min}:${sec}`;
            }, 1000);
            return workingTimer;
        }
    }
}