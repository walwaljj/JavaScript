let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

adjustHealthBars(chosenMaxLife); //chosenMaxLife 를 전달 -> 웹 HTML 체력 bar를 조정함.

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
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost');
    }else if(currentMonsterHealth <= 0 && currentMonsterHealth <= 0 ){
         alert('You have a draw');
    }
}

function attackMonster(mode){
    let maxDamage;
    if (mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    }else if(mode ==='STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
    endRound();// 공격과 마찬가지로 1회 힐 사용-> 1회 몬스터의 반격.
}


attackBtn.addEventListener('click',attackHandler);//attackBtn = document.getElementById('attack-btn'); 
                                    // attack-btn 이 click 시 반응함
            
strongAttackBtn.addEventListener('click',strongAttackHandler);                                    
healBtn.addEventListener('click', healPlayerHandler);
