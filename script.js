let answer01 = document.getElementById('answer-1').addEventListener( 'change', exercise01 );

// функзия запуска упражнения
function runExercise( thisID ){
    let boxes = document.getElementsByClassName('content-box');
    let buttons = document.getElementsByTagName('li');
    let inputs = document.getElementsByTagName('input');

    for( let element of boxes ){
        console.log( element.id == `box-${thisID}` );
        if( element.id == `box-${thisID}` ){
            element.classList.remove('content-box__hide');
        } else {
            element.classList.add('content-box__hide');
        };
    };

    for( let button of buttons ){
        if(button.id == thisID){
            button.classList.add('btn__on');
        } else {
            button.classList.remove('btn__on');
        }
    }

    for( let input of inputs){
        if(input.id == `answer-${thisID}`){
            input.focus();
        } else {
            input.removeAttribute("autofocus");
        };
    }

    
}

function exercise01(){
    document.getElementById('res-1').innerHTML = this.value;
    this.value = '';
}