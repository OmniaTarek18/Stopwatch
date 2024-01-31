export default class Time {
    constructor(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        
    }
    update(hr,min,sec){
        this.hours = hr;
        this.minutes = min;
        this.seconds = sec;
    }
    print(){
        var min = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        var sec = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        var hr = this.hours < 10 ? "0" + this.hours : this.hours;
         return hr + " : " + min +  " : " + sec ;
    }
    calcPeriod(lastLab){
        var timeInSeconds =  this.timeInSeocnds();
        var lastTimeInSeconds = lastLab.seconds + lastLab.minutes*60 + lastLab.hours*60*60;
        var period = timeInSeconds - lastTimeInSeconds ;

        var seconds = parseInt(period % 60);
        var minutes = parseInt(period / 60);
        var hours = parseInt(period / 3600);

        var min = minutes < 10 ? "0" + minutes : minutes;
        var sec = seconds < 10 ? "0" + seconds : seconds;
        var hr = hours < 10 ? "0" + hours : hours;
         return hr + " : " + min +  " : " + sec ;    
    }
    timeInSeocnds(){
        return this.seconds + this.minutes*60 + this.hours*60*60;
    }
}