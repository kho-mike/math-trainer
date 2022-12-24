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
        start: 2,
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
    },

    // Умножение на 4
    5: {
        name: "Умножение на 4",
        operator: "&#183",
        operand: 4,
        start: 2,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        7: 28,
        8: 32,
        9: 36,
        10: 40,
        all: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    // Деление на 4
    6: {
        name: "Деление на 4",
        operator: ":",
        operand: 4,
        start: 8,
        8: 2,
        12: 3,
        16: 4,
        20: 5,
        24: 6,
        28: 7,
        32: 8,
        36: 9,
        40: 10,
        all: [8, 12, 16, 20, 24, 28, 32, 36, 40]
    },

    // Состав числа 10
    50: {
        name: "Состав числа 10",
        operator: "и",
        operand: 4,
        start: 1,
        1: 9,
        2: 8,
        3: 7,
        4: 6,
        5: 5,
        6: 4,
        7: 3,
        8: 2,
        9: 1,
        all: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
}


// функзия запуска упражнения
class Exercise {
    constructor( thisID ){

        thisID *= 1;


        this.buttons = document.getElementsByTagName('li');

        this.currentValue = 2;

        this.startExercise( thisID );


    }

    startExercise( thisID ){

        thisID *= 1;
        this.number = thisID;
        this.maxScore = 20;

        this.createBox( thisID );

        for( let button of this.buttons ){
            if(button.id == thisID){
                button.classList.add('btn__on');
            } else {
                button.classList.remove('btn__on');
            }
        }
        
        this.currentValue = answeres[thisID].start; 
       
        this.msgClear();

        this.score = 0;
        this.step = 1;

    
        this.input.focus();

    }

    createBox( ID ){

        let box = document.getElementById('box');
        box.innerHTML = "";

        let header = document.createElement('div');
        header.classList.add("content--header");
        header.id = "content-header";
        header.innerHTML = "<h2>" + answeres[ID].name + "</h2>";

        this.header = header;

        let progress = document.createElement('div');
        progress.classList.add("progress-bar");
        progress.innerHTML = '<progress id="progress"' + this.maxScore + '></progress>';

        let exercise = document.createElement('div');
        exercise.classList.add('content--exercise');
        if(this.number < 50){
            exercise.innerHTML = '<div class="element" id="firstOperand">' + answeres[ID].start + '</div>' + 
                                '<div class="element" id="operator">' + answeres[ID].operator + '</div>' +
                                '<div class="element" id="secondOperand">' + answeres[ID].operand + '</div>' +
                                '<div class="element">=</div>' +
                                '<input class="input-waiting" id="answer" type="text" autofocus onchange="exercise.giveAnswer(this.value)">';
        };

        if(this.number >= 50){
            exercise.innerHTML = '<div class="element" id="firstOperand">' + answeres[ID].start + '</div>' + 
                                '<div class="element" id="operator">' + answeres[ID].operator + '</div>' +
                                '<input class="input-waiting" id="answer" type="text" autofocus onchange="exercise.giveAnswer(this.value)">';
        };
        

        let msg = document.createElement('div');
        msg.classList.add('content--msg');
        msg.id = 'msg';
        

        box.appendChild(header);
        box.appendChild(progress);
        box.appendChild(exercise);
        box.appendChild(msg);


        this.header = document.getElementById('content-header');
        this.firstOperand = document.getElementById('firstOperand');
        this.secondOperand = document.getElementById('secondOperand');
        this.operator = document.getElementById('operator');
        this.input = document.getElementById('answer');
        this.msg = document.getElementById('msg');
        this.progress = document.getElementById('progress');




    }

    setCurrentValue(){
        //
        let nextValue = this.currentValue;

        switch (this.number) {
            case 1:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 2:
                if(this.score < 9){
                    nextValue += 2;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                

            case 3:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                

            case 4:
                if(this.score < 9){
                    nextValue += 3;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 5:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 6:
                if(this.score < 9){
                    nextValue += 4;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 50:
                if(this.score < 9){
                    nextValue ++;
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

    giveAnswer( answer ){
        this.msgClear();

        if ( answer == answeres[this.number][this.currentValue] ) {
            this.step++;
            this.score++;
            this.setCurrentValue();

            this.firstOperand.innerHTML = exercise.currentValue;

            this.input.classList.add('input-right');
            setTimeout( () => {
                //
                this.input.classList.remove('input-right');
            } , 1000)
        } else {
            this.msgShow( "wrong", "Попробуй еще разочек..." )
            this.input.classList.add('input-wrong');
            setTimeout( () => {
                //
                this.input.classList.remove('input-wrong');
            } , 1000)
        }

        this.input.value = '';

        this.progress.max = 20;
        this.progress.value = exercise.score;

        if(this.score >= 20) this.msgShow("right", "Молодец! Все примеры решены верно!");
        }
        
}

var exercise = new Exercise(1);