console.log("Welcome TO Game");
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.getElementById('winning-message-text');
const restartButton = document.getElementById('restartButton');
let turn = "X"

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const line = document.getElementById('line');

// Function to position and show the winning line
const showLine = (combination) => {
    const firstCell = boxes[combination[0]].getBoundingClientRect();
    const lastCell = boxes[combination[2]].getBoundingClientRect();

    const centerX1 = (firstCell.left + firstCell.right) / 2;
    const centerY1 = (firstCell.top + firstCell.bottom) / 2;
    const centerX2 = (lastCell.left + lastCell.right) / 2;
    const centerY2 = (lastCell.top + lastCell.bottom) / 2;

    const angle = Math.atan2(centerY2 - centerY1, centerX2 - centerX1) * 180 / Math.PI;

    const distance = Math.sqrt(Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2));

    line.style.width = `${distance}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${centerY1 - 2.5}px`; // Adjust by half the line's height
    line.style.left = `${centerX1 - distance / 2}px`; // Adjust by half the line's length

    line.classList.remove('hide');
}


//Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

// Function to check for a win
const checkWin = () => {
    const boxes = document.getElementsByClassName("cell");
    return winningCombinations.some(combination => {      //It checks every combination of array
        return combination.every(index => {               //It checks every element in the combination array
            return boxes[index].innerText === turn;
        });
    });
};

// Function to check for a Draw
const checkDraw = () => {
    const boxes = document.getElementsByClassName("cell");
    return Array.from(boxes).every(cell => {
        return cell.innerText !== '';
    });
};

//Main Game Logic
let boxes = document.getElementsByClassName("cell");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', () => {
        if (element.innerText === '') {
            element.innerText = turn;
            element.classList.add(turn === "X" ? "x" : "o"); // Add the class based on the turn
            if (checkWin()) {
                winningMessageTextElement.innerText = `${turn} Wins!`;
                winningMessageElement.classList.remove('hide');
            } else if (checkDraw()) {
                winningMessageTextElement.innerText = 'Draw!';
                winningMessageElement.classList.remove('hide');
            } else {
                turn = changeTurn();
            }
        }
    })
});

// Restart game
restartButton.addEventListener('click', () => {
    Array.from(boxes).forEach(element => {
        element.innerText = '';
        element.classList.remove("x", "o"); // Remove the classes when resetting the game
    });
    winningMessageElement.classList.add('hide');
    turn = "X"; // Reset the turn to X for a fresh start
});
