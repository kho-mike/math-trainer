let answer01 = document.getElementById('answer-01').addEventListener( 'change', exercise01 );
function exercise01(){
    document.getElementById('1-res').innerHTML = this.value;
    this.value = '';
}