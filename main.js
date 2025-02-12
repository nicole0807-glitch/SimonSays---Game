const botonjugar = document.getElementById('botonjugar');
const botones = document.getElementsByClassName('Botones');
const spanRound = document.querySelector('span[data-round]');
class Game{
    constructor(botonjugar, botones, spanRound){
        this.round = 0;
        this.userposition = 0;
        this.totalrounds = 10;
        this.sequence = [];
        this.speed = 1000;
    }
    start(){
        this.round = 1;
        spanRound.textContent = this.round;
    }
    nextRound(){
        this.round++;
        spanRound.textContent = this.round;
    }

}