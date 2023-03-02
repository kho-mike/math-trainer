const DB = window.localStorage;

const user = {
    register(){
        return id;
    },

    signin(){
        let login = document.getElementById('login').value;
        let pass = document.getElementById('pass').value;

        if(DB[`user-${login}`]){
            let user = JSON.parse(DB[`user-${login}`]);
            if(user.pass === pass){
                DB.currentUser = login;
                app.currentUser = user;
                app.addMessage( 'right', 'Вы успешно авторизованы!' );
            } else {
                app.addMessage( 'wrong', 'Пароль введен неверно!' );
            }
        } else {
            app.addMessage( 'wrong', `Пользователя с логином ${login} не существует!` );
        }

        app.show();
        //
    },
}





const app = {
    // приложение по проверке результата

    DBusers: window.localStorage.app.users,

    exercises: {
        multiplication: [2, 3, 4, 5, 6, 7, 8, 9],
        multiplication_2:  [ [2, 4], [3, 6], [4, 8], [5, 10], [6, 12], [7, 14], [8, 16], [9, 18] ],
        multiplication_3:  [ [2, 6], [3, 9], [4, 12], [5, 15], [6, 18], [7, 21], [8, 24], [9, 27] ],
        multiplication_4:  [ [2, 8], [3, 12], [4, 16], [5, 20], [6, 24], [7, 28], [8, 32], [9, 36] ],
        multiplication_5:  [ [2, 10], [3, 15], [4, 20], [5, 25], [6, 30], [7, 35], [8, 40], [9, 45] ],
        multiplication_6:  [ [2, 12], [3, 18], [4, 24], [5, 30], [6, 36], [7, 42], [8, 48], [9, 54] ],
        multiplication_7:  [ [2, 14], [3, 21], [4, 28], [5, 35], [6, 42], [7, 49], [8, 56], [9, 63] ],
        multiplication_8:  [ [2, 16], [3, 24], [4, 32], [5, 40], [6, 48], [7, 56], [8, 64], [9, 72] ],
        multiplication_9:  [ [2, 18], [3, 27], [4, 36], [5, 45], [6, 54], [7, 63], [8, 72], [9, 81] ],

        division: [2, 3, 4, 5, 6, 7, 8, 9],
        division_2:  [ [4, 2], [6, 3], [8, 4], [10, 5], [12, 6], [14, 7], [16, 8], [18, 9] ],
        division_3:  [ [6, 2], [9, 3], [12, 4], [15, 5], [18, 6], [21, 7], [24, 8], [27, 9] ],
        division_4:  [ [8, 2], [12, 3], [16, 4], [20, 5], [24, 6], [28, 7], [32, 8], [36, 9] ],
        division_5:  [ [10, 2], [15, 3], [20, 4], [25, 5], [30, 6], [35, 7], [40, 8], [45, 9] ],
        division_6:  [ [12, 2], [18, 3], [24, 4], [30, 5], [36, 6], [42, 7], [48, 8], [54, 9] ],
        division_7:  [ [14, 2], [21, 3], [28, 4], [35, 5], [42, 6], [49, 7], [56, 8], [63, 9] ],
        division_8:  [ [16, 2], [24, 3], [32, 4], [40, 5], [48, 6], [56, 7], [64, 8], [72, 9] ],
        division_9:  [ [18, 2], [27, 3], [36, 4], [45, 5], [54, 6], [63, 7], [72, 8], [81, 9] ],

        composition: [6, 7, 8, 9, 10],
        composition_6:  [ [1, 5], [2, 4], [3, 3], [4, 2], [5, 1] ],
        composition_7:  [ [1, 6], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1] ],
        composition_8:  [ [1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1] ],
        composition_9:  [ [1, 8], [2, 7], [3, 6], [4, 5], [5, 4], [6, 3], [7, 2], [8, 1] ],
        composition_10:  [ [1, 9], [2, 8], [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [8, 2], [9, 1] ],
    },

    operators: {
        multiplication: "&#183",
        division: ":",
        composition: "и",
    },

    chooseOperation( inputOperation ){
        this.exercise.temp.operation = inputOperation;
        this.exercise.temp.operator = this.operators[inputOperation];
        this.exercise.temp.currentStage = "chooseOperand";
        this.show();
    },

    chooseOperand( inputOperand ){
        this.exercise.temp.operand = inputOperand;

        const exerciseArray = this.exercises[`${this.exercise.temp.operation}_${this.exercise.temp.operand}`];

        for(let elem of exerciseArray){
            this.exercise.temp.stage1.push(elem);
        }

        while (this.exercise.temp.stage2.length < exerciseArray.length) {

            let randomIndex = Math.floor( Math.random()*exerciseArray.length);

            if(this.exercise.temp.stage2.indexOf(exerciseArray[randomIndex])>=0){
                continue;
            }
            this.exercise.temp.stage2.push(exerciseArray[randomIndex]);

        }

        this.exercise.temp.currentValue = this.exercise.temp.stage1[0][0];
        this.exercise.temp.currentResult = this.exercise.temp.stage1[0][1];

        this.exercise.temp.currentStage = "getAnswere";
        this.show();
    },

    start(){},

    stop(){},

    getAnswere(inputAnswere){
        if( this.check(inputAnswere) ){
            this.addMessage( 'right', 'Молодец! Ответ верный!' );
        } else {
            this.addMessage( 'wrong', 'Попробуй еще разок...' );

        }

        this.exercise.allAnsweres.push( {input: inputAnswere, current: this.exercise.temp.currentResult,} );

        this.show();

    },

    show( currentStage = this.exercise.temp.currentStage ){

        let app = document.getElementById('app');
        switch (currentStage) {

            case "signin":
                app.innerHTML = `
                
                `;



            case "chooseOperation":
                app.innerHTML = `
                <div class="app-wrapper">
                    <div class="menu" id="first">
                        <div class="menu-item" id="multiplication" onclick="app.chooseOperation(this.id);">Умножение</div>
                        <div class="menu-item" id="division" onclick="app.chooseOperation(this.id);">Деление</div>
                        <div class="menu-item" id="composition" onclick="app.chooseOperation(this.id);">Состав числа</div>
                    </div>
                </div>
                `;
                break;

            case "chooseOperand":

            console.log(this.exercise.temp.operation);

            app.innerHTML = `
                <div class="app-wrapper">
                    <div class="menu" id="second">
                `;

                for(item of this.exercises[this.exercise.temp.operation]){
                    app.innerHTML += `
                        <div class="menu-item" id="${item}" onclick="app.chooseOperand(this.id);">${item}</div>
                    `;
                };

                app.innerHTML += `
                    </div>
                </div>
                `;

                break;

            case "getAnswere":

                app.innerHTML = `
                    <div class="app-wrapper">
                `;

                if(this.exercise.temp.operation == 'composition'){
                    app.innerHTML += `
                        <div class="app-wrapper-header">
                            Упражнение "СОСТАВ ЧИСЛА ${this.exercise.temp.operand}"
                        </div>
                        <div class="app-wrapper-content">
                            <div class="element" id="firstOperand"> ${ this.exercise.temp.operand } </div> 
                            <div class="element" id="operator">${ this.exercise.temp.operator }</div>
                            <input class="input-waiting" id="" type="text" autofocus onchange=" app.getAnswere(this.value); ">
                        </div>
                    `;
                } else {
                    let operationRUS;
                    if(this.exercise.temp.operation == 'multiplication'){
                        operationRUS = 'УМНОЖЕНИЕ';
                    } else if(this.exercise.temp.operation == 'division'){
                        operationRUS = 'ДЕЛЕНИЕ';
                    }
                    app.innerHTML += `
                        <div class="app-wrapper-header">
                        Упражнение "${operationRUS} НА ${this.exercise.temp.operand}"
                        </div>
                        <div class="app-wrapper-content">
                            <div class="element" id="firstOperand">${this.exercise.temp.currentValue}</div>
                            <div class="element" id="operator"> ${this.exercise.temp.operator} </div>
                            <div class="element" id="secondOperand">${this.exercise.temp.operand}</div>
                            <div class="element">=</div>
                            <input class="input-waiting" id="answer" type="text" autofocus onchange="app.getAnswere(this.value)">
                        </div>
                    `;
                }

                app.innerHTML += `
                    </div>
                `;

                break;
        
            default:
                break;
        }

        if(this.exercise.temp.messages.length > 0){
            this.showMessages();
        }
        

        console.table( this.exercise );
    },


    addMessage( inpytType, inputText ){
        this.exercise.temp.messages.push({type: inpytType, text: inputText});
    },


    showMessages(){
        //
        let msgBox = document.createElement('div');
        msgBox.id = 'app-msgBox';
        for(let msg of this.exercise.temp.messages){
            msgBox.innerHTML += `
                <div class="msg-${msg.type}"><p>${msg.text}</p></div>
            `
        };

        document.getElementById('app').appendChild(msgBox);

    },

    hideMessages(){
        document.getElementById('app').removeChild(document.getElementById('app-msgBox'));
    },

    check( inputAnswere ){
        return inputAnswere == this.exercise.temp.currentResult;
    },

    next(){
        if(this.exercise.temp.stage1.length > 0){

        }
    },

    repeat(){
        //
    },

    save(){},

    currentUser: null,

    exercise: {
        timeStart: null,
        timeStop: null,
        timeLenght: null,
        countAnsweres: 0,
        countRightAnsweres: 0,
        countWrongAnsweres: 0,

        wrongAnsweres: [],
        allAnsweres: [],

        operation: null,
        operand: null,
        operator: null,

        temp: {
            currentStage: "chooseOperation",
            currentValue: null,
            currentResult: null,
            stage1: [],
            stage2: [],
            messages: [],
        }
    },


}

if(DB.currentUser && DB.currentUser!==null){
    app.currentUser = JSON.parse(DB[`user-${DB.currentUser}`]);
};

// app.show();

const database = {


    data: window.localStorage.data,

}




// функция запуска упражнения
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

            case 7:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 8:
                if(this.score < 9){
                    nextValue += 5;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 9:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
    
            case 10:
                if(this.score < 9){
                    nextValue += 6;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 11:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
        
            case 12:
                if(this.score < 9){
                    nextValue += 7;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 13:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
            
            case 14:
                if(this.score < 9){
                    nextValue += 8;
                } else {
                    nextValue = this.randomValue();
                }
                break;

            case 15:
                if(this.score < 9){
                    nextValue++;
                } else {
                    nextValue = this.randomValue();
                }
                break;
                
            case 16:
                if(this.score < 9){
                    nextValue += 9;
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