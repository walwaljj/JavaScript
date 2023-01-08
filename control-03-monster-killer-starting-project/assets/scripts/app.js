let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
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
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

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
