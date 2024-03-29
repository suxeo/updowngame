//게임에 필요한 logic

//랜덤번호 지정
//유저가 번호를 입력한다=>go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면 맞췄습니다!
//랜덤번호 < 유저번호 Down!!!
//랜점번호 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 reset된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려주낟. 기회를 깍지 않는다

let computerNum = 0;  //랜덤한 수를 받는 값
let playButton = document.getElementById("play-button"); //document는 index.html이고 Id중에서 paly-button을 Id로 선택해 js로 가져온다.
let userInput = document.querySelector("#user-input");
let resultText = document.querySelector(".result-text");
let resultAreaImg = document.querySelector(".main-img");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history =[];
//Event추가시
chanceArea.innerHTML=`남은 기회 : ${chances}`;
playButton.addEventListener("click",play);  //이벤트를 더해줌 함수를 매개변수로 넘기기 가능
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value="";
});  //input창을 클릭하면 input창엔 아무것도 없다

function pickRandomNum(){  //랜덤숫자 뽑기
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);  //,는 스페이스바
}

function play(){  //user가 값을 넣고 클릭 후 상황 코드
   //숫자추측하기
    let userValue = userInput.value; //userInput.value은 html에 넣는 input의 값을 받아오기
    //유효성검사1
    if(userValue<1 || userValue>100){
        resultText.textContent= "1과100사이에 숫자를 입력하세요!"
        return;  //종료를 시키고 밑 코드는 실행하지 않는다
    }
    //유효성검사2
    if(history.includes(userValue)){  //history에 user가 입력한 값이 있다면
        resultText.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해 주세요!"
        return;
    }

    chances -- ;  //클릭 후 기회 -1씩
    chanceArea.innerHTML = `남은 기회 : ${chances}번`
    history.push(userValue);

    if(userValue < computerNum){
        resultAreaImg.src =
      "image/산리오up.gif";
        resultText.textContent = "Up!"  //결과값을 html div에 보내주기
    }else if(userValue > computerNum){
        resultAreaImg.src = "image/산리오down.gif";
        resultText.textContent = "Down!"
    }else{
        resultAreaImg.src =
      "image/산리오맞춤.gif";
        resultText.textContent = "정답!!!"
        gameOver = true;
    }

    if(chances==0){ //chances가 0부터 gameOver
        gameOver = true;
    }

    if(gameOver==true){
        playButton.disabled = true;  //Go!버튼 더이상 click 못하도록 disabled하기
    }
}

function reset(){
    //새로운 번호가 생성
    pickRandomNum()
    //user input창이 깨끗하게 정리
    userInput.value = ""
    //위에 글바꾸기 ex)맞추셨습니다=>결과 값이 여기 나옵니다
    resultText.textContent = "결과 값이 여기 나옵니다!"
    //result 사진 reset
    resultAreaImg.src="https://i.pinimg.com/originals/3d/87/06/3d870624ced9c5aacb7c05df5df005a0.gif";
    gameOver=false; 
    playButton.disabled = false; //playButton(Go!)이 다시뜬다 
    chances = 5;  //기회가 5로 바뀐다
    chanceArea.innerHTML = `남은 기회 : ${chances}번`
    history = [];  //값의 list가 다시 깨끗하도록
}


pickRandomNum();  //랜덤한 숫자를 선택