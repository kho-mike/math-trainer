var answeres = {
    1: {
        start: 2,
        2: 4,
        3: 6,
        4: 8,
        5: 10,
        6: 12,
        7: 14,
        8: 16,
        9: 18,
        10: 20,
        all: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    2: {
        start: 4,
        4: 2,
        6: 3,
        8: 4,
        10: 5,
        12: 6,
        14: 7,
        16: 8,
        18: 9,
        20: 10,
        all: [4, 6, 8, 10, 12, 14, 16, 18, 20]
    },

    3: {
        start: 3,
        2: 6,
        3: 9,
        4: 12,
        5: 15,
        6: 18,
        7: 21,
        8: 24,
        9: 27,
        10: 30,
        all: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    4: {
        start: 6,
        6: 2,
        9: 3,
        12: 4,
        15: 5,
        18: 6,
        21: 7,
        24: 8,
        27: 9,
        30: 10,
        all: [6, 9, 12, 15, 18, 21, 24, 27, 30]
    }
}


// функзия запуска упражнения
class Exercise {
    constructor( thisID ){

        thisID *= 1;

        this.boxes = document.getElementsByClassName('content-box');
        this.buttons = document.getElementsByTagName('li');
        this.inputs = document.getElementsByTagName('input');

        this.currentValue = 2;

        this.startExercise( thisID );


    }

    startExercise( thisID ){

        thisID *= 1;

        this.number = thisID;
        this.currentValue = answeres[thisID].start;
        document.getElementById(`1-${thisID}`).innerHTML = this.currentValue;
        this.score = 0;
        this.step = 1;

        for( let element of this.boxes ){
            if( element.id == `box-${thisID}` ){
                element.classList.remove('content-box__hide');
            } else {
                element.classList.add('content-box__hide');
            };
        };
    
        for( let button of this.buttons ){
            if(button.id == thisID){
                button.classList.add('btn__on');
            } else {
                button.classList.remove('btn__on');
            }
        }
    
        for( let input of this.inputs){
            if(input.id == `answer-${thisID}`){
                input.focus();
            } else {
                input.removeAttribute("autofocus");
            };
        }

        document.getElementById('progress-bar').max = '';
        document.getElementById('progress-bar').value = '';

    }

    setCurrentValue(){
        //
        let nextValue = this.currentValue;

        switch (this.number) {
            case 1:
                if(this.score < 8){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 2:
                if(this.score < 8){
                    nextValue += 2;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                
                break;

            case 3:
                if(this.score < 8){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                
                break;

            case 4:
                if(this.score < 8){
                    nextValue += 3;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                
                break;
        }
        this.currentValue = nextValue;
    }

    randomValue(){
        let array = answeres[exercise.number].all
        let randomValue;
        do {
            randomValue = array[ Math.floor( Math.random()*(array.length-1) ) ];
        } while (randomValue == exercise.currentValue);
        return randomValue;
    }
        
}

var exercise = new Exercise(1);

function giveAnswer(answer){
    document.getElementById(`msg-${exercise.number}`).innerHTML = "";


    if( answer == answeres[exercise.number][exercise.currentValue] ){
        console.log('good');
        exercise.setCurrentValue();
        exercise.step++;
        exercise.score++;
        document.getElementById(`1-${exercise.number}`).innerHTML = exercise.currentValue;

        document.getElementById(`answer-${exercise.number}`).classList.add('input-right');
        setTimeout( () => {
            //
            document.getElementById(`answer-${exercise.number}`).classList.remove('input-right');
        } , 1000)
    } else {
        console.log('bad');
        document.getElementById(`msg-${exercise.number}`).innerHTML = "попробуй еще раз";
        document.getElementById(`answer-${exercise.number}`).classList.add('input-wrong');
        setTimeout( () => {
            //
            document.getElementById(`answer-${exercise.number}`).classList.remove('input-wrong');
        } , 1000)
    }
    document.getElementById(`answer-${exercise.number}`).value = '';

    document.getElementById('progress-bar').max = 20;
    document.getElementById('progress-bar').value = exercise.score;


    console.log(exercise.score);

}