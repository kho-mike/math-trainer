var answeres = {
    1: {
        name: "Умножение на 2",
        operator: "&#183",
        operand: 2,
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
        name: "Деление на 2",
        operator: ":",
        operand: 2,
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
        name: "Умножение на 3",
        operator: "&#183",
        operand: 3,
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
        name: "Деление на 3",
        operator: ":",
        operand: 3,
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

        this.header = document.getElementById('content-header');
        this.buttons = document.getElementsByTagName('li');
        this.firstOperand = document.getElementById('firstOperand');
        this.secondOperand = document.getElementById('secondOperand');
        this.operator = document.getElementById('operator');
        this.input = document.getElementById('answer');
        this.msg = document.getElementById('msg');
        this.progress = document.getElementById('progress');

        this.currentValue = 2;

        this.startExercise( thisID );


    }

    startExercise( thisID ){

        thisID *= 1;

        this.number = thisID;
        this.currentValue = answeres[thisID].start;
        this.firstOperand.innerHTML = this.currentValue;
        this.secondOperand.innerHTML = answeres[thisID].operand;
        this.header.innerHTML = '<h2>' + answeres[thisID].name + '</h2>';
        this.operator.innerHTML = answeres[thisID].operator;
        this.msgClear();

        this.score = 0;
        this.step = 1;

    
        for( let button of this.buttons ){
            if(button.id == thisID){
                button.classList.add('btn__on');
            } else {
                button.classList.remove('btn__on');
            }
        }
    
        this.input.focus();
       

        this.progress.max = '';
        this.progress.value = '';

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
                

            case 3:
                if(this.score < 8){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                

            case 4:
                if(this.score < 8){
                    nextValue += 3;
                } else {
                    nextValue = this.randomValue();
                }
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


    msgClear(){

        this.msg.innerHTML = "";
        this.msg.classList.value = "";

    }

    msgShow( type, text ){
        //
        if("wrong" == type) this.msg.classList.add('msg-wrong');
        if("right" == type) this.msg.classList.add('msg-right');

        this.msg.innerHTML = text;
    }
        
}

var exercise = new Exercise(1);

function giveAnswer(answer){

    exercise.msgClear();

    if( answer == answeres[exercise.number][exercise.currentValue] ){

        exercise.setCurrentValue();
        exercise.step++;
        exercise.score++;
        exercise.firstOperand.innerHTML = exercise.currentValue;

        exercise.input.classList.add('input-right');
        setTimeout( () => {
            //
            exercise.input.classList.remove('input-right');
        } , 1000)
    } else {

        exercise.msgShow( "wrong", "Попробуй еще разочек..." )
        exercise.input.classList.add('input-wrong');
        setTimeout( () => {
            //
            exercise.input.classList.remove('input-wrong');
        } , 1000)
    }
    exercise.input.value = '';

    exercise.progress.max = 20;
    exercise.progress.value = exercise.score;

    if(exercise.score >= 20) exercise.msgShow("right", "Молодец! Все примеры решены верно!");

}