
const defultResult = 0;
let currentResult = defultResult;

// currentResult = (currentResult + 10) * 3 / 2 - 1;

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;//나타낼 텍스트를 변수에 담음.
    outputResult(currentResult,calcDescription);//html에 출력할 함수,
}

function getUerNumberInput(){
    return parseInt(userInput.value);//사용자가 html에 입력한 텍스트를 정수로 바꿔 반환.
}

function add(){
    const enteredNumber = getUerNumberInput();// 사용자가 입력한 정수
    const initialResult = currentResult; // 0에서 부터 시작한 계산 전의 수
    currentResult += enteredNumber;// 계산전 수 + 입력한 수
    // currentResult = currentResult + +userInput.value;//+ == perseInt
    // alert('The result is' + result);
    // return result;
    createAndWriteOutput('+',initialResult, enteredNumber)
}

function subtract(){
    const enteredNumber = getUerNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    
    createAndWriteOutput('-',initialResult, enteredNumber)
}

function multiply(){
    const enteredNumber = getUerNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    
    createAndWriteOutput('*',initialResult, enteredNumber)
}

function divide(){
    const enteredNumber = getUerNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    
    createAndWriteOutput('/',initialResult, enteredNumber)
}
addBtn.addEventListener('click', add);//여기서는 함수뒤에 () 안함;
subtractBtn.addEventListener('click',subtract);
multiplyBtn.addEventListener('click',multiply);
divideBtn.addEventListener('click',divide);

