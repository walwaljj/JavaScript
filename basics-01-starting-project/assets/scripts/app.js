
const defultResult = 0;
let currentResult = defultResult;

// currentResult = (currentResult + 10) * 3 / 2 - 1;

function add(){
    currentResult = currentResult + userInput.value;
    // alert('The result is' + result);
    // return result;
    outputResult(currentResult,'');
}
addBtn.addEventListener('click', add);//여기서는 함수뒤에 () 안함;

