let chosenMaxLife = 100;
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

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
function attackMonster(mode){
    let maxDamage;
    if (mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    }else if(mode ==='STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
function attackHandler(){
    attackMonster('ATTACK')
}
function strongAttackHandler(){
    attackMonster('STRONG_ATTACK')
}


attackBtn.addEventListener('click',attackHandler);//attackBtn = document.getElementById('attack-btn'); 
                                    // attack-btn 이 click 시 반응함
            
strongAttackBtn.addEventListener('click',strongAttackHandler);                                    

