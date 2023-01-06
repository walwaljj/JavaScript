
const defultResult = 0;
let currentResult = defultResult;
let logEntries=[];
// currentResult = (currentResult + 10) * 3 / 2 - 1;

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;//나타낼 텍스트를 변수에 담음.
    outputResult(currentResult,calcDescription);//html에 출력할 함수,
}

function getUerNumberInput(){
    return parseInt(userInput.value);//사용자가 html에 입력한 텍스트를 정수로 바꿔 반환.
}

function writeToLog(operationIdentifier, prevResult , operationNumber , newResult){
    const logEntry = {
        operation: operationIdentifier,
        prevRresult: prevResult,//계산전
        number: operationNumber,//사용자 입력 수
        result: newResult// 연산 결과.
    };
    // logEntries = [enteredNumber];// 새로운 배열을 정의할 때
    logEntries.push(logEntry);
    // console.log(logEntry.operation);//객체의 값을 콘솔로 얻을 수 있다.
    console.log(logEntries);
}

function calculateResult(calculationType){

        
    if(
        calculationType !== 'ADD' && 
        calculationType !=='SUBTRACT' &&
        calculationType !== 'MULTIPLY' &&
        calculationType !== 'DIVIDE' ||
        !enteredNumber // 은  enteredNumber === 0  과 같다.
    ){
        return;// 코드 공유시 ㄴ 조건문의 '문자열'이 일치하지 않을때 return 문으로 아래 실행코드가 실행되지 않도록 함,
    }



    const enteredNumber = getUerNumberInput();
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
        currentResult += enteredNumber;
        mathOperator = '+';
    }else if(calculationType === 'SUBTRACT'){
        currentResult -= enteredNumber;
        mathOperator = '-';
    }else if(calculationType === 'MULTIPLY'){
        currentResult *= enteredNumber;
        mathOperator = '*';
    }else if(calculationType === 'DIVIDE'){
        currentResult /= enteredNumber;
        mathOperator = '/';
    }

    
    createAndWriteOutput(mathOperator,initialResult, enteredNumber);
    writeToLog(calculationType,initialResult,enteredNumber,currentResult);
}

function add(){
    calculateResult('ADD');
    
}

function subtract(){
    calculateResult('SUBTRACT');
}

function multiply(){
    calculateResult('MULTIPLY');
}

function divide(){
    calculateResult('DIVIDE');
}
addBtn.addEventListener('click', add);//여기서는 함수뒤에 () 안함;
subtractBtn.addEventListener('click',subtract);
multiplyBtn.addEventListener('click',multiply);
divideBtn.addEventListener('click',divide);

