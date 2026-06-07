let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-button');
let turn0 = false;
let newgameButton = document.querySelector('.newgame-button');
let msg = document.querySelector('.msg');
let msgp = document.querySelector('#winner-msg');

let arr= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(box.innerText == ''){
            box.innerText = turn0 ? 'O' : 'X';
            turn0 = !turn0;
            checkWin();
        }
        box.disabled = true;
    });
});

const showWinner = (winner) => {
    if (winner) {
        msgp.innerText = `🎉 Winner is ${winner}`;
    } else {
        msgp.innerText =  `It's a Tie!`;
    }

    msg.classList.remove('hide');

    boxes.forEach((box) => {
        box.disabled = true;
    });
};
const checkWin = () => {
    let winnerFound = false;

    for (let pattern of arr) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            winnerFound = true;
            showWinner(pos1);
            return;
        }
    }

    // Check for tie
    let filledBoxes = 0;

    boxes.forEach((box) => {
        if (box.innerText !== '') {
            filledBoxes++;
        }
    });

    if (filledBoxes === 9 && !winnerFound) {
        showWinner(null);
    }
};

const resetGame = () => {
    boxes.forEach((box)=>{
        box.innerText = '';
        box.disabled = false;
    });
    msg.classList.add('hide');
    turn0 = false;
};

resetButton.addEventListener('click', resetGame);
newgameButton.addEventListener('click',()=>{
    msg.classList.add('hide');
    resetGame();
});
