
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';



// 로그내용을 저장할 배열
let battleLog = []; 
let lastLoggedEntry;

function getMaxLifeValues(){
    const enteredValue = prompt('Maximum life for you and the monster.','100');//대화상자, 파이썬의 input

    let parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || chosenMaxLife <=0 ){ // isNaN() 숫자인지 , 아닌지 판별, true , false 의 값을 가진다.
        throw// 새로운 오류를 만드는 키워드. (숫자, 문자, 객체 오류등)
        {message : 'Invalid user input, not a number!'};// throw 는 메세지 프로퍼티를 가짐. 여기서는 prompt 에 숫자값이 아닐때 오류가 나는 상황을 만들기 위해 사용함,
    }
    return parsedValue;
}

let  chosenMaxLife;

//폴백로직. 코드 전체를 try~catch 하지 말고 , 함수를 이용하자!
try { 
    chosenMaxLife = getMaxLifeValues();
}catch(e){
    console.log(e);
    chosenMaxLife = 100;
    clearTimeout('잘못된 값이 입력되었습니다. 기본값 100 으로 설정됩니다.')
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

if (isNaN(chosenMaxLife) || chosenMaxLife <=0 ){ // isNaN() 숫자인지 , 아닌지
    chosenMaxLife = 100;
}


adjustHealthBars(chosenMaxLife); //chosenMaxLife 를 전달 -> 웹 HTML 체력 bar를 조정함.


//로그를 battleLog에 저장하게 할 함수.
function writeToLog(ev , val, monsterHealth, playerHealth){
    let logEntry = {
        event: ev,// 이벤트 명
        value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch (ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: ev,// 이벤트 명
                value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: ev,// 이벤트 명
                value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        case LOG_EVENT_PLAYER_HEAL :
            logEntry = {
                    event: ev,// 이벤트 명
                    value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
                    target: 'PLAYER',
                    finalMonsterHealth: monsterHealth,
                    finalPlayerHealth: playerHealth
                };
            break;
        case LOG_EVENT_GAME_OVER :
            logEntry = {
                event: ev,// 이벤트 명
                value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default: logEntry = {};
    }

    // if(ev === LOG_EVENT_PLAYER_ATTACK){
    //     logEntry.target = 'MONSTER';//    logEntry = {      target: 'MONSTER'      } 같음.

    // } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    //     logEntry = {
    //         event: ev,// 이벤트 명
    //         value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    //     // battleLog.push(logEntry);
    // } else if(ev === LOG_EVENT_MONSTER_ATTACK){ 
    //     logEntry = {
    //         event: ev,// 이벤트 명
    //         value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    //     // battleLog.push(logEntry);
    // }else if(ev === LOG_EVENT_MONSTER_ATTACK){
    // logEntry = {
    //     event: ev,// 이벤트 명
    //     value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
    //     target: 'PLAYER',
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth
    // };
    // battleLog.push(logEntry);
    // }else if(ev === LOG_EVENT_PLAYER_HEAL){
    // logEntry = {
        //     event: ev,// 이벤트 명
        //     value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
        //     target: 'PLAYER',
        //     finalMonsterHealth: monsterHealth,
        //     finalPlayerHealth: playerHealth
        // };
        // battleLog.push(logEntry);
        // }
            // }else if(ev === LOG_EVENT_GAME_OVER){
    // logEntry = {
        //     event: ev,// 이벤트 명
        //     value: val,// 이벤트의 값 (회복 체력, 데미지 양 등..)
        //     finalMonsterHealth: monsterHealth,
        //     finalPlayerHealth: playerHealth
        // };
        // battleLog.push(logEntry);
        // }
    battleLog.push(logEntry);
}


// 게임을 리셋할 함수
function reset(){ 
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);//생명 표시바 재 설정하기.
}

// function attackHandler(){
//     const damage = dealMonsterDamage(ATTACK_VALUE);
//     currentMonsterHealth -= damage;
//     const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);//1회 공격 후 몬스터의 1회 반격.
//     currentPlayerHealth -= playerDamage;

//     if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
//         alert('You won!');
//     }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
//         alert('You lost');
//     }else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0 ){
//          alert('You have a draw');
//     }
// }

// function strongAttackHandler(){
//     const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
//     currentMonsterHealth -= damage;
//     const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
//     currentPlayerHealth -= playerDamage;

//     if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
//         alert('You won!');
//     }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
//         alert('You lost');
//     }else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0 ){
//          alert('You have a draw');
//     }

// }



function endRound(){
    const initialPlayerHealth = currentPlayerHealth;//몬스터가 공격하기 전 사용자의 체력을 변수에 저장.
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,
         playerDamage,
          currentMonsterHealth,
           currentPlayerHealth);
    //          식별자                  ,   값          ,   몬스터 상태         ,  플레이어 상태


    if (currentPlayerHealth <= 0 && hasBonusLife){ // 플레이어의 현재 체력이 0 과 같고, 보너스생명이 있으면
        hasBonusLife = false;// 보너수 생명을 사용했기 때문에 false로 값을 변경하고
        removeBonusLife();// HTML의 보너스 생명을 삭제함.
        currentPlayerHealth = initialPlayerHealth;// 몬스터가 공격하기 전 저장했었던 체력을 다시 불러옴,
                                                //즉 , 몬스터가 공격을 해 체력이 0 이되는 순간 보너스 생명으로 사용자가 지게 될 상황을 벗어남.  
        
        setPlayerHealth(initialPlayerHealth);//html 의 체력을 보너스 체력만클 업데이트 시킴.
        alert('You would be dead but the bonus  life saved you!');
        
        }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost');
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    }else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0 ){
        alert('You have a draw');
        writeToLog(LOG_EVENT_GAME_OVER, 'A DRAW', currentMonsterHealth, currentPlayerHealth);
    }

    if ((currentMonsterHealth || currentPlayerHealth )<= 0){
        reset();
    }
}

function attackMonster(mode){
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    
    // if (mode === MODE_ATTACK ){
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // }else if(mode === MODE_STRONG_ATTACK ){
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();

}




function attackHandler(){
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler(){
    let healValue;
    if( currentPlayerHealth >= chosenMaxLife - HEAL_VALUE ){//플레이어의 체력 > 최대체력 - 회복체력
        // 즉, 현제 플레이어의 체력이 힐 받고 난 후 최대체력을 초과한다면
        alert("You can' heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;//최대체력 - 플레이어의 체력 만큼만 회복
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);// HTML 상태 바를 받은 heal만큼 채움
    currentPlayerHealth += healValue;// 플레이어의 체력 = 플레이어의 체력 + 회복 체력
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();// 공격과 마찬가지로 1회 힐 사용-> 1회 몬스터의 반격.
}

function printLogHandler(){
    // for(let i = 0 ; i < 3 ; i ++){
    //     console.log('-------------');
    // }
    let j = 0;
    // while(j >3){
    //     console.log('-------------');
    //     j++;
    // }
    do{
        console.log('-------------');
        j++;
    }while(j >3);

    let i = 0;

    // for(const logEntry of battleLog){
    //     console.log(logEntry);
    //     console.log(i);
    //     i++;
    // }

    for(const logEntry of battleLog){// 배열이 저장된 battleLog 를 꺼내 logEntry 에 저장함.
        console.log(`${i}`);
        for(const key in logEntry){// logEntry 에 저장된 내용 event, value 등 )을 key 변수에 저장, 
            console.log(`${key} => ${logEntry[key]} `);// consol에 키 => 값 형태로 출력.
        }
        i++;
    }
}

attackBtn.addEventListener('click',attackHandler);//attackBtn = document.getElementById('attack-btn'); 
                                    // attack-btn 이 click 시 반응함
            
strongAttackBtn.addEventListener('click',strongAttackHandler);                                    
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);
