//Select Necessary Element
let winScoreElm=document.querySelector('.winscore');
let p1ScoreElm=document.querySelector('.p1-score');
let p2ScoreElm=document.querySelector('.p2-score');
let winScoreInput=document.getElementById('win-input');
let formElm=document.querySelector('form');
let submitBtn=document.querySelector('input[type=submit]');
let p1Btn=document.querySelector('.p1-button');
let p2Btn=document.querySelector('.p2-button');
let resetBtn=document.querySelector('.reset');

//Initiate Value
let winScore=0;
let p1Score=0;
let p2Score=0;
let turn='player1';
let isValidMessage=false;


//Initiate Element Value
winScoreElm.textContent=winScore;
p1ScoreElm.textContent=p1Score;
p2ScoreElm.textContent=p2Score;
p1Btn.setAttribute('disabled','disabled');
p2Btn.setAttribute('disabled','disabled');
resetBtn.setAttribute('disabled','disabled');

function generateRandomNum(num){
    return Math.floor(Math.random()*num +1);
}


formElm.addEventListener('submit',function(e){
    e.preventDefault();
    let inputValue=winScoreInput.value;
    if(inputValue === '' || inputValue < 0){
        if(!isValidMessage){
            formElm.insertAdjacentHTML('beforeend','<p class="message">Please Enter a Valid number</p>');
            isValidMessage=true;
            resetBtn.removeAttribute('disabled');
        }
    }else{
        winScore=Number(inputValue);
        winScoreElm.textContent=winScore;
        winScoreInput.value='';
        p1Btn.removeAttribute('disabled');
        p2Btn.removeAttribute('disabled');
        resetBtn.removeAttribute('disabled');
        isValidMessage=false;
    }
    winScoreInput.setAttribute('disabled',true);
    submitBtn.setAttribute('disabled',true);
});

    function displayWinner(p1WinState,p2WinState){
        if(p1WinState){
            formElm.insertAdjacentHTML('beforeend','<p class="message">Player 1 is Winner</p>');
        }else if(p2WinState){
            formElm.insertAdjacentHTML('beforeend','<p class="message">Player 2 is Winner</p>');
        }
    }

    function checkWinner(){
        let isP1Winner= p1Score === winScore;
        let isP2Winner= p2Score === winScore;
        if(isP1Winner || isP2Winner){
            p1Btn.setAttribute('disabled','disabled');
            p2Btn.setAttribute('disabled','disabled');
            displayWinner(isP1Winner,isP2Winner);
        }
    }    
    
    p1Btn.addEventListener('click',function(e){
        if (turn === 'player1') {
            p1Score= generateRandomNum(winScore);
            p1ScoreElm.textContent=p1Score;
            turn='player2';
            this.setAttribute('disabled',true);
            p2Btn.removeAttribute('disabled');
            checkWinner();
        }
    });


   
    p2Btn.addEventListener('click',function(e){
        if (turn === 'player2') {
            p2Score=generateRandomNum(winScore);
            p2ScoreElm.textContent=p2Score;
            turn='player1';
            this.setAttribute('disabled',true);
            p1Btn.removeAttribute('disabled');
            checkWinner();
        }
    });

    resetBtn.addEventListener('click',function(e){
        winScore=0;
        p1Score=0;
        p2Score=0;
        turn='player1';
        winScoreElm.textContent=winScore;
        p1ScoreElm.textContent=p1Score;
        p2ScoreElm.textContent=p2Score;
        p1Btn.setAttribute('disabled','disabled');
        p2Btn.setAttribute('disabled','disabled');
        winScoreInput.removeAttribute('disabled');
        submitBtn.removeAttribute('disabled');
        this.setAttribute('disabled','disabled');
        if (document.querySelector('.message')){
            document.querySelector('.message').remove();
        }
    });


